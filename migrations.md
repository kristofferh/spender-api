# Migrations

If you need to update the tables in staging or production you'll need to run migrations on them. We use the [`sequelize cli`](http://docs.sequelizejs.com/en/latest/docs/migrations/#the-cli) tool.

To run a migration locally first create the migration file. This example will create a new model named User:

```
$ sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```

This will create a skeleton file that will have an `up` and a `down` function. The `up` function is the migration that will be invoked when you run the `sequelize db:migrate` command. The `down` function is the rollback. Once you've create your migrations run it with the `db:migrate` command. This will run all migrations in the `migrations` folder (if they haven't already been run -- sequelize will check the `SequelizeMeta` table in the DB).

To run a migration run the following command:

```
heroku run npx sequelize-cli db:migrate --app spender-dev
```
