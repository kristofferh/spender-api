import models from "../../models";
import { auth } from "../../services/auth";

const { sequelize, Tag, Item } = models;

// Get a tag by ID, including the total items and count.
// @todo: Just use `Items.getByTag` instead?
export async function getById({ id }, associationWhere, ctx) {
  const uid = auth(ctx);
  const where = {
    UserId: uid,
    id
  };
  return await Tag.findOne({
    attributes: Object.keys(Tag.attributes).concat([
      [sequelize.fn("SUM", sequelize.col("Items.amount")), "total"],
      [sequelize.fn("COUNT", sequelize.col("Items.id")), "count"]
    ]),
    include: {
      model: Item,
      duplicating: false,
      where: associationWhere
    },
    includeIgnoreAttributes: false, // Weird bug.
    where,
    group: ["Tag.id"]
  });
}

// Get all tags. Includes aggregation details for totalItems and totalItemsCount.
export async function getItemsByTags(
  parentValue,
  { limit, year, month, offset, order },
  ctx
) {
  const id = auth(ctx);
  const { sequelize, Sequelize } = models;
  const yearSQL = sequelize.where(
    sequelize.fn("date_part", "year", sequelize.col("date")),
    year
  );
  const monthSQL = sequelize.where(
    sequelize.fn("date_part", "month", sequelize.col("date")),
    month
  );
  const where = {
    UserId: id,
    [Sequelize.Op.and]: [year ? yearSQL : null, month ? monthSQL : null]
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
    attributes: Object.keys(models.Tag.attributes).concat([
      [sequelize.fn("SUM", sequelize.col("Items.amount")), "total"],
      [sequelize.fn("COUNT", sequelize.col("Items.id")), "count"]
    ]),
    include: {
      model: models.Item,
      duplicating: false
    },
    includeIgnoreAttributes: false, // Weird bug.
    where,
    offset,
    order,
    limit,
    group: ["Tag.id"]
  });
}

// Get all tags. Includes aggregation details for totalItems and totalItemsCount.
export async function getAll(
  parentValue,
  { limit, year, month, offset, order },
  ctx
) {
  const id = auth(ctx);
  const { sequelize, Sequelize } = models;
  const yearSQL = sequelize.where(
    sequelize.fn("date_part", "year", sequelize.col("date")),
    year
  );
  const monthSQL = sequelize.where(
    sequelize.fn("date_part", "month", sequelize.col("date")),
    month
  );
  const where = {
    UserId: id,
    [Sequelize.Op.and]: [year ? yearSQL : null, month ? monthSQL : null]
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
    attributes: Object.keys(models.Tag.attributes).concat([
      [sequelize.fn("SUM", sequelize.col("Items.amount")), "total"],
      [sequelize.fn("COUNT", sequelize.col("Items.id")), "count"]
    ]),
    include: {
      model: models.Item,
      duplicating: false
    },
    includeIgnoreAttributes: false, // Weird bug.
    where,
    offset,
    order,
    limit,
    group: ["Tag.id"]
  });
}

// Create tag
export async function create(parentValue, { name, description, color }, ctx) {
  const id = auth(ctx);
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
