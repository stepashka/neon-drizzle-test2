# About

This is a self-driving demo of Neon + Drizzle + Cloudflare Pages + GitHub actions for Preview environments.
This demonstrates how neon database branches can power your dev and rpeview environments.
Follow the steps below to race through the demo.

## Self Driving Demo

### Prerequisites
1. You need to be added as collaborator for the project on Neon adn GitHub (ask Anna).
2. you need to follow the link in GitHub's invite email to accept it.
3. Execute the commands in your mac os terminal. This was only tested on Mac OS.
4. You will have to have nodejs installed, e.g. `brew install node`
5. GitHub CLI is optional, you can get away without it, but one of the commands uses it, install it with `brew install gh`

### Clone the repo and set up envrionemtns
```
gh repo clone stepashka/neon-drizzle-test2
cd neon-drizzle-test2/
npm install
npx neon auth
```

### Create a dev branch and add it to env variables for local use
```
npx neon branches create --name dev/$USER
echo DATABASE_URL= > .dev.vars
sed -i '' "s|\(DATABASE_URL.*\)|DATABASE_URL=$(npx neon connection-string dev/$USER)|" .dev.vars
```
Check out that branch was created on Neon console, there's data in it from the parent: https://console.neon.tech/app/projects/shiny-poetry-60171502/branches

### Run the project locally
```
npx wrangler pages dev
```

### Add a new field into authors table via schema, generate and apply the migrations with Drizzle
```
git checkout -b "$USER"_adds_country
sed -i '' 's|//country: text|country: text|' src/schema.ts
npm run db:generate
npm run db:migrate
```
Inspect the content of your **dev** branch on Neon console: https://console.neon.tech/app/projects/shiny-poetry-60171502/branches

### Run the project locally and check that the /authors list now has the countries field
```
npx wrangler pages dev
```

### Commit and push the changes, open a pull request and watch the cloudflare build
```
git add drizzle/* src/*
git commit -m "$USER adds countries"
git push --set-upstream origin "$USER"_adds_country
open https://github.com/stepashka/neon-drizzle-test2/pull/new/"$USER"_adds_country
```
Identify the content of your **preview** branch on Neon console: https://console.neon.tech/app/projects/shiny-poetry-60171502/branches

**Please do NOT merge the pull request: keep some fun for the others!**

## Further TODOs for this demo
- figure out where to add the migration into production deployment (of the main branch) that is managed by cloudflare integration
- add cleanup of deployments and branches on pr merge
