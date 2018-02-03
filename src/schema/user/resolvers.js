import models from "../../models";

// Get user by ID
export async function getById(_, { id }) {
  return await models.User.findOne({ where: { id } });
}

// Get all users
export async function getAll() {
  return await models.User.findAll();
}

// Delete user
export async function remove(_, { id }) {
  return await models.User.destroy({ where: { id } });
}
