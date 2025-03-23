console.log(`
⚙️ Build
Builds the Reaper.js application.
npm run build
or
npx reaperjs build

🚀 Start
Starts a built server.
npm start
or
npx reaperjs start

🔄 Dev
Runs the application in development mode, watching for file changes.
npm run dev
or
npx reaperjs dev

🗄️ Migrate
Runs new database migrations.
npm run migrate
or
npx reaperjs migrate

↩️ Rollback
Undoes the last migration.
npm run rollback
or
npx reaperjs rollback

🌱 Seed
Runs database seeders.
To execute all seeders use:
npm run seed
or
npx reaperjs seed
To execute a single seeder use:
npm run seed {name}
or
npx reaperjs seed {name}

🛠️ Make
Creates project resources.
npm run make {type} {name}
or
npx reaperjs make {type} {name}
Types
controller (makes a new controller as "api/controllers/{name}Controller.ts")
middleware (makes new middleware as "api/middleware/{name}Middleware.ts")
event (makes a new event as "api/events/{name}Event.ts")
service (makes a new service as "api/services/{name}Service.ts")
model (makes a new model as "db/models/{name}Model.ts")
migration (makes a new migration as "db/migrations/{date}_{name}.ts")
seeder (makes a new seeder as "db/seeders/{name}Seeder.ts")

❓ Help
Logs list of commands and other tips.
npm run help
or
npx reaperjs help
`)