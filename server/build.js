const esbuild = require("esbuild");
const path = require("path");
const sassPlugin = require("esbuild-plugin-sass");
const tailwindPlugin = require("esbuild-plugin-tailwindcss");
const fs = require("fs")
const dirs = require("reaperjs/server/config/dirs");
const writeTemplate = require("./views/writeTemplate");
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

async function build(files = [],sub,mode="client") {
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
    outdir: path.join(process.cwd(), '.reaper/out',sub), // Output directory for bundled files
    sourcemap: true,  
    minify:false,     
    platform:mode == "client" ?"browser":"node",  
    format: mode == "client" ?"esm":"cjs",            // Target browser platform (or change to 'node' for server-side)
    loader: {
      ...mode == "client"?{
        '.css': 'css',                   // Treat `.css` files as CSS
        '.scss': 'css',                  // Treat `.scss` files as CSS (after SASS compilation)
        '.js': 'jsx',                    // Treat `.js` files as JS (or JSX)
        '.ts': 'ts',                     // Treat `.ts` files as TypeScript
        '.tsx': 'tsx',                   // Treat `.tsx` files as TypeScript JSX
      }:{
        '.js': 'js',                    // Treat `.js` files as JS (or JSX)
        '.ts': 'ts',                     // Treat `.ts` files as TypeScript
      }
    },
    plugins: [
      tailwindPlugin.default(),                // Adds Tailwind CSS support
      sassPlugin(),                    // Adds SASS support
      {
        name: 'css-plugin',
        setup(build) {
          build.onLoad({ filter: /\.css$/ }, async (args) => {
            const fs = require('fs');
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
};
const processFiles =async (dirPath, processCallback) => {
  const files = fs.readdirSync(dirPath).filter(filename=>filename!="index.ejs").map(filename => path.join(dirPath, filename));
  await processCallback(files)
};

module.exports = {
  vercel:async()=>{
    await module.exports.client();
    await module.exports.server();
    await build([path.join(__dirname,"./vercel")],"../../vercel","server")
  },
  //client side builds
  client:async()=>{
    writeTemplate.clear();
    if(fs.existsSync(path.join(process.cwd(),"./.reaper/out/templates")))fs.rmSync(path.join(process.cwd(),"./.reaper/out/templates",),{recursive:true});
    //MAKE ALL TEMPLATES
    await processFiles(`${path.join(appDir,"./views")}`, async(files) =>{
      for(const file of files){
        const name = path.basename(file);
        writeTemplate({
          name,
          view:path.join(appDir,"./views",name),
          layout:path.join(appDir,"./layout")
        });
      }
      await processFiles(path.join(appDir,"../.reaper/temp/views/"), async(files) =>{
        return await build(files,"templates","client")
      });
    });
  },
  //server side builds
  server:async()=>{
    if(fs.existsSync(path.join(process.cwd(),"./.reaper/out/api")))fs.rmSync(path.join(process.cwd(),"./.reaper/out/api",),{recursive:true});
    if(fs.existsSync(path.join(process.cwd(),"./.reaper/out/routes")))fs.rmSync(path.join(process.cwd(),"./.reaper/out/routes",),{recursive:true});
    await processFiles(routesDir, async(files) =>await build(files,"routes/index","server"));
    await processFiles(listenersDir, async(files) =>await build(files,"api/events","server"));  
    await processFiles(controllerDir, async(files) =>await build(files,"api/controllers","server"));  
    await processFiles(servicesDir, async(files) => await build(files,"api/services","server"));
    await processFiles(middlewareDir, async(files) =>await build(files,"api/middleware","server"));
  },
  //migrations build
  migrations:async()=>{
    await processFiles(path.join(__dirname,"../db/migrate"), async(files) =>await build(files,"migrate","server"));  
    await processFiles(path.join(process.cwd(),"./db/migrations"), async(files) =>await build(files,"migrations","server"));  
  },
  //seeders build
  seeders:async()=>{
    if(fs.existsSync(path.join(process.cwd(),"./.reaper/out/seeders")))fs.rmSync(path.join(process.cwd(),"./.reaper/out/seeders",),{recursive:true});
    await processFiles(seedersDir, async(files) =>await build(files,"seeders","server"));  
  }
}