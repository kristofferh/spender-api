import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import models from "../../models";

// Get user by ID
export async function getById(_, { id }) {
  return await models.User.findOne({ where: { id } });
}

// Get all users
export async function getAll() {
  return await models.User.findAll();
}

export async function authenticate(_, { email, password }) {
  const user = await models.User.findOne({ where: { email } });

  if (!user) {
    throw new Error(`Could not find user with email: ${email}`);
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.id }, "pizza");
  user.token = token;

  return user;
}

// Create user
export async function create(_, { email, password }) {
  const user = await models.User.create({
    email,
    password
  });

  const token = jwt.sign({ id: user.id }, "pizza");
  user.token = token;

  return user;
}

// Delete user
export async function remove(_, { id }) {
  return await models.User.destroy({ where: { id } });
}
