import models from "../../models";
import { auth } from "../../services/auth";

// Get tag by ID
export async function getById(parentValue, { id }, ctx) {
  auth(ctx);
  return await models.Tag.findById(id);
}

// Get all tags, optionally by year and month.
export async function getAll(
  parentValue,
  { limit, year, month, offset, order },
  ctx
) {
  const id = auth(ctx);
  const { sequelize, Sequelize } = models;
  const where = {
    UserId: id,
    [Sequelize.Op.and]: [
      year
        ? sequelize.where(sequelize.fn("YEAR", sequelize.col("date")), year)
        : null,
      month
        ? sequelize.where(sequelize.fn("MONTH", sequelize.col("date")), month)
        : null
    ]
  };

  // Hacky order by.
  if (order) {
    if (order.indexOf("reverse:total") === 0) {
      order = [sequelize.literal("total DESC")];
    } else if (order.indexOf("total") === 0) {
      order = [sequelize.literal("total ASC")];
    } else {
      order =
        order.indexOf("reverse:") === 0
          ? [[order.substring(8), "DESC"]]
          : [[order, "ASC"]];
    }
  }

  return await models.Tag.findAll({
    where,
    offset,
    order,
    limit
  });
}

// Create tag
export async function create(parentValue, { name, description, color }, ctx) {
  const id = auth(ctx);
  // Make sure that the user is authorized to insert here / get userid.
  return await models.Tag.create({
    name,
    description,
    color,
    UserId: id
  });
}

// Delete tag
export async function remove(parentValue, { id }, ctx) {
  const uid = auth(ctx);
  return await models.Tag.destroy({ where: { id, UserId: uid } });
}
