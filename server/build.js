const esbuild = require("esbuild");
const path = require("path");
const sassPlugin = require("esbuild-plugin-sass");
const tailwindPlugin = require("esbuild-plugin-tailwindcss");
const fs = require("fs");
const dirs = require("reaperjs/server/config/dirs");
const writeTemplate = require("./views/writeTemplate");
const logger = require("../utils/logger")
const {
  controllerDir,
  middlewareDir,
  routesDir,
  appDir,
  seedersDir,
  servicesDir,
  listenersDir
} = dirs;
const tsConfigPath = path.join(process.cwd(), "tsconfig.json");

// Utility to check if a directory exists and remove it
const cleanDirectory = (dirPath) => {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
};
const ensureDirectoryExistence = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

async function build(files = [], sub, mode = "client") {
  try {
    const outDir = path.join(process.cwd(), '.reaper/out', sub);
    ensureDirectoryExistence(".reaper");
    ensureDirectoryExistence(".reaper/out");
    ensureDirectoryExistence(".reaper/out/api");
    ensureDirectoryExistence(".reaper/out/api/controllers");
    ensureDirectoryExistence(".reaper/out/api/middleware");
    ensureDirectoryExistence(".reaper/out/templates");
    ensureDirectoryExistence(".reaper/out/routes");
    ensureDirectoryExistence(".reaper/temp");    
    ensureDirectoryExistence(outDir);
    const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf8"));
    const aliasPaths = tsConfig.compilerOptions?.paths || {};
    const alias = Object.entries(aliasPaths).reduce((acc, [key, values]) => {
      const aliasKey = key.replace("/*", ""); // Remove '/*' at the end
      const aliasValue = path.join(process.cwd(), values[0].replace("/*", "")); // Resolve absolute path
      acc[aliasKey] = aliasValue;
      return acc;
    }, {});
    await esbuild.build({
      entryPoints: files,               // JS, TS, or CSS/SASS files that import CSS/SASS
      bundle: true,                      // Bundle all dependencies (CSS/SASS)
      outdir: path.join(process.cwd(), '.reaper/out', sub), // Output directory for bundled files
      sourcemap: true,  
      minify: false,     
      platform: mode == "client" ? "browser" : "node",  
      format: mode == "client" ? "esm" : "cjs",            // Target browser platform (or change to 'node' for server-side)
      loader: {
        ...mode == "client" ? {
          '.css': 'css',                   // Treat `.css` files as CSS
          '.scss': 'css',                  // Treat `.scss` files as CSS (after SASS compilation)
          '.js': 'jsx',                    // Treat `.js` files as JS (or JSX)
          '.ts': 'ts',                     // Treat `.ts` files as TypeScript
          '.tsx': 'tsx',                   // Treat `.tsx` files as TypeScript JSX
        } : {
          '.js': 'js',                    // Treat `.js` files as JS (or JSX)
          '.ts': 'ts',                     // Treat `.ts` files as TypeScript
        }
      },
      plugins: [
        tailwindPlugin.default(),                // Adds Tailwind CSS support
        sassPlugin(),                            // Adds SASS support
        {
          name: 'css-plugin',
          setup(build) {
            build.onLoad({ filter: /\.css$/ }, async (args) => {
              const css = fs.readFileSync(args.path, 'utf8');
              return {
                contents: css,         // Output the CSS content
                loader: 'css',         // Treat this as CSS content
              };
            });
          },
        },
      ],
      define: {
        "process.env.NODE_ENV": JSON.stringify("production"), // Suppresses React DevTools message
      },
      tsconfig: path.join(process.cwd(), './tsconfig.json'),
      
      alias
    });
  } catch (error) {
    logger.error(`Error during build: ${error.message}`);
  }
}

// Utility to process files and call the provided callback
const processFiles = async (dirPath, processCallback) => {
  try {
    const files = fs.readdirSync(dirPath)
      .filter(filename => filename !== "index.ejs")
      .map(filename => path.join(dirPath, filename));

    if (files.length > 0) {
      await processCallback(files);
    } else {
      console.log(`No files found in directory: ${dirPath}`);
    }
  } catch (error) {
    console.error(`Error processing files in ${dirPath}: ${error.message}`);
  }
};

module.exports = {
  // Client-side build process
  client: async () => {
    try {
      writeTemplate.clear();

      const templateDir = path.join(process.cwd(), "./.reaper/out/templates");
      cleanDirectory(templateDir);  // Remove old templates directory if it exists

      // MAKE ALL TEMPLATES
      await processFiles(`${path.join(appDir, "./views")}`, async (files) => {
        for (const file of files) {
          const name = path.basename(file);
          writeTemplate({
            name,
            view: path.join(appDir, "./views", name),
            layout: path.join(appDir, "./layout")
          });
        }

        // Build templates for the client
        await processFiles(path.join(appDir, "../.reaper/temp/views/"), async (files) => {
          await build(files, "templates", "client");
        });
      });

    } catch (error) {
      console.error(`Error in client build: ${error.message}`);
    }
  },

  // Server-side build process
  server: async () => {
    try {
      // Clean up old output directories
      cleanDirectory(path.join(process.cwd(), "./.reaper/out/api"));
      cleanDirectory(path.join(process.cwd(), "./.reaper/out/routes"));

      // Build server-side files
      await processFiles(routesDir, async (files) => await build(files, "routes/index", "server"));
      await processFiles(controllerDir, async (files) => await build(files, "api/controllers", "server"));
      await processFiles(servicesDir, async (files) => await build(files, "api/services", "server"));
      await processFiles(middlewareDir, async (files) => await build(files, "api/middleware", "server"));

    } catch (error) {
      console.error(`Error in server build: ${error.message}`);
    }
  },

  // Migrations build process
  migrations: async () => {
    try {
      // Clean up old migrations directory
      cleanDirectory(path.join(process.cwd(), "./.reaper/out/migrations"));

      // Build migration files
      await processFiles(path.join(__dirname, "../db/migrate"), async (files) => await build(files, "migrate", "server"));
      await processFiles(path.join(process.cwd(), "./db/migrations"), async (files) => await build(files, "migrations", "server"));

    } catch (error) {
      console.error(`Error in migrations build: ${error.message}`);
    }
  },

  // Seeders build process
  seeders: async () => {
    try {
      // Clean up old seeders directory
      cleanDirectory(path.join(process.cwd(), "./.reaper/out/seeders"));

      // Build seeders files
      await processFiles(seedersDir, async (files) => await build(files, "seeders", "server"));

    } catch (error) {
      console.error(`Error in seeders build: ${error.message}`);
    }
  }
};
