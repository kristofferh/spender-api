import jwt from "jsonwebtoken";

import models from "../../models";

// Get user by ID
export async function getById(parentValue, { id }) {
  return await models.User.findOne({ where: { id } });
}

// Get all users
export async function getAll() {
  return await models.User.findAll();
}

// Create user
export async function create(parentValue, { email, password }) {
  const user = await models.User.create({
    email,
    password
  });

  const token = jwt.sign({ id: user.id }, "pizza");

  return {
    user,
    token
  };
}

// Delete item
export async function remove(parentValue, { id }) {
  return await models.User.destroy({ where: { id } });
}
