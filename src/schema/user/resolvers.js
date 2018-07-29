import { resolver } from "graphql-sequelize";

import models from "../../models";
import { auth } from "../../services/auth";

// Get user by ID
export async function getById(_, __, ctx) {
  const uid = auth(ctx);
  // @todo: add ability to look up user id with admin scope.
  return await models.User.findOne({ where: { id: uid } });
}

export const currentUser = resolver(models.User, {
  before: (findOptions, args, context) => {
    const uid = auth(context);
    // @todo: add ability to look up user id with admin scope.
    findOptions.where = { id: uid };
    return findOptions;
  }
});

// Get all users
export async function getAll() {
  // @todo: lock this down with scopes.
  return await models.User.findAll();
}

// Delete user
export async function remove(_, __, ctx) {
  const id = auth(ctx);
  return await models.User.destroy({ where: { id } });
}
