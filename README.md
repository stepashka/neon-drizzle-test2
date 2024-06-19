### Clone the repo and set up envrionemtns
```
gh repo clone stepashka/neon-drizzle-test2
cd neon-drizzle-test2/
npm install
```

### Create a dev branch and add it to env variables for local use
```
npx neon branches create --name dev/$USER
echo DATABASE_URL= > .dev.vars
sed -i '' "s|\(DATABASE_URL.*\)|DATABASE_URL=$(npx neon connection-string dev/$USER)|" .dev.vars
```

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

### Run the project locally and check that the /authors list now has the countries field
```
npx wrangler pages dev
```

### Commit and push the changes, open a pull request and watch the cloudflare build
```
git add drizzle/* src/*
git commit -m "$USER adds countries"
git push --set-upstream origin "$USER"_adds_country
https://github.com/stepashka/neon-drizzle-test2/pull/new/"$USER"_adds_country
```

TBD:
- figure out where to add the migration into production deployment (of the main branch) that is managed by cloudflare integration
- add cleanup of deployments and branches on pr merge
