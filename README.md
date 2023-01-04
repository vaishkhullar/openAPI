# News BE API

## Background

We will be building an API for the purpose of accessing application data programmatically. The intention here is to mimic the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

Your database will be PSQL, and you will interact with it using [node-postgres](https://node-postgres.com/).

## Link to hosted version

https://openapi-be-news-1.onrender.com/api

## Project summary

A backend project which gives you access to API end points to receive data

##Cloning, installing, seeding a local database and running tests

- Fork the repository
- Enter your terminal and go to the desired folder you would like to save the repo
- Enter the command: `git clone url .`
- cd into the new file and type ` code .`
- This should open the file directories within a text editor
- Run `npm install`

## Set-up

In order to set up the environment please create two .env files in your root directory.

- .env.test should set PGDATABASE to be the test database
  `PGDATABASE = nc_news_test`
- .env.development should set PGDATABASE to be the development database
  `PGDATABASE = nc_news`
- run the command `npm setup-dbs`
- run the command `npm seed`
- run the command ` npm start` - the server will now be listening on port 9091

##Minimum version and requirements

- Stable on node: v19.3.0
- Stable on dotenv: v16.0.0,
- Stable on express: v4.18.2
- Stable on pg: v8.7.3
