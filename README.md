# Spender API

Node API using Sequelize, GraphQL and Express.

This API uses Postgres, but that could be swapped out later.

## Postgres Setup

Easiest is to use [Postgres.app](https://postgresapp.com/). Install the app, launch it, and click "initialize" to create a new server. Connect to the server using the command line tools or [Postico](https://eggerapps.at/postico/).

Create a new DB called `spender`.

Create a new role for `local-dev`.

In Terminal, connect to postgres:

```
sudo psql -U my_macosx_username postgres
```

To view a list of all the ROLE and USER groups for a Postgres server, you can use the following psql command:

```
\du
```

Create new role:

```
CREATE ROLE "local-dev" with LOGIN ENCRYPTED PASSWORD 'local';
```

## Dev setup

Run `yarn` to get dependencies.

Create a new `.env` file. Get the contents from 1Password.

## Usage

In Dev:

```
yarn install
yarn dev
```

Prod:

```
yarn build
yarn start
```

Test:

```
yarn test
```
