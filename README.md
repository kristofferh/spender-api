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

```
yarn dev
```

If all goes well, this should start up the API server.

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

## Running local queries

Start the server

```
yarn dev
```

Then in the browser go to http://localhost:3000. This will run GraphQL. Some (most) queries and mutations require authentication.

One way to solve that is to

1. Request a user token

```
  mutation requestToken($delivery:String!, $deliveryType:String) {
    requestNewToken(delivery: $delivery, deliveryType: $deliveryType) {
      success
    }
  }
```

Query variables:

```
  {
    "delivery": "kris.hedstrom@gmail.com",
    "deliveryType": "email"
  }
```

2. Check email and copy the token
3. Verify the token

```
    mutation verifyToken($delivery:String!, $token:String!) {
      verifyToken(delivery: $delivery, token: $token) {
        token
      }
    }
```

Query variables:

```
  {
    "delivery": "kris.hedstrom@gmail.com",
    "token": <TOKEN>
  }
```

4. Copy the token returned
5. Add it to ModHeader extension (using `Authorization`, `Bearer <Token>`)
6. You should now be able to query and mutate protected routes

Example

```
query User {
  user {
    id
    items {
      edges {
        node {
          id
          date
          description
        }
      }
    }
  }
}
```
