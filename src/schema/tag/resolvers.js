import models from "../../models";

// Get tag by ID
export async function getById(parentValue, { id }) {
  return await models.Tag.findById(id);
}

// Get all tags
export async function getAll(parentValue, { limit, offset, order }) {
  return await models.Tag.findAll({
    limit: limit,
    offset: offset,
    order: order
      ? order.indexOf("reverse:") === 0
        ? [[order.substring(8), "DESC"]]
        : [[order, "ASC"]]
      : undefined
  });
}

// Create tag
export async function create(parentValue, { name }) {
  // Make sure that the user is authorized to insert here / get userid.
  return await models.Tag.create({
    name,
    UserId: 1
  });
}

// Delete tag
export async function remove(parentValue, { id }) {
  return await models.Tag.destroy({ where: { id } });
}
