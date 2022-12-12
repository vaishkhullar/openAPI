# News BE API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Set-up

In oder to set up the environment please create two .env files in your root directory.

- .env.test should set PGDATABASE to be the test database
  `PGDATABASE = nc_news_test`
- .env.development should set PGDATABASE to be the development database
  `PGDATABASE = nc_news`
