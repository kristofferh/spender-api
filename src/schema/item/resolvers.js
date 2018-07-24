import models from "../../models";
import { auth } from "../../services/auth";

// Get item by ID
export async function getById(parentValue, { id }, ctx) {
  auth(ctx);
  return await models.Item.findById(id);
}

// Get all items
export async function getAll(_, { limit, offset, order }, ctx) {
  const id = auth(ctx);
  return await models.Item.findAll({
    where: {
      UserId: id
    },
    limit: limit,
    offset: offset,
    order: order
      ? order.indexOf("reverse:") === 0
        ? [[order.substring(8), "DESC"]]
        : [[order, "ASC"]]
      : undefined
  });
}

// Get all items by a given month
export async function getByMonth(
  parentValue,
  { month, year, limit, offset, order },
  ctx
) {
  const { sequelize, Sequelize } = models;
  const id = auth(ctx);
  return await models.Item.findAll({
    where: {
      UserId: id,
      [Sequelize.Op.and]: [
        sequelize.where(
          sequelize.fn("date_part", "year", sequelize.col("date")),
          year
        ),
        sequelize.where(
          sequelize.fn("date_part", "month", sequelize.col("date")),
          month
        )
      ]
    },
    limit: limit,
    offset: offset,
    order: order
      ? order.indexOf("reverse:") === 0
        ? [[order.substring(8), "DESC"]]
        : [[order, "ASC"]]
      : undefined
  });
}

// Get all items by a given tag, optionally by year and month.
export async function getByTag(
  parentValue,
  { tagId, limit, year, month, offset, order },
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
  return await models.Item.findAll({
    include: {
      model: models.Tag,
      where: { id: tagId }
    },
    where,
    limit: limit,
    offset: offset,
    order: order
      ? order.indexOf("reverse:") === 0
        ? [[order.substring(8), "DESC"]]
        : [[order, "ASC"]]
      : undefined
  });
}

// Create item
export async function create({ date, amount, description, tags }, ctx) {
  const uid = auth(ctx);
  return await models.Item
    .create({
      date: date,
      amount: amount,
      description: description,
      UserId: uid
    })
    .then(item => {
      if (tags) {
        return models.Sequelize.Promise
          .map(tags, tag => {
            return models.Tag.findOrCreate({
              where: {
                name: tag.name.toLowerCase(),
                UserId: uid
              }
            });
          })
          .then(tags => {
            tags = tags.map(tag => {
              return tag[0];
            });
            return item.addTags(tags).then(() => item);
          });
      }
      return item;
    });
}

// Create item
export async function edit({ id, date, amount, description, tags }, ctx) {
  const uid = auth(ctx);
  await models.Item.update(
    {
      date: date,
      amount: amount,
      description: description,
      UserId: uid
    },
    {
      where: {
        id: id
      }
    }
  );

  let item = await models.Item.findById(id);

  if (tags) {
    item = await models.Sequelize.Promise
      .map(tags, tag => {
        return models.Tag.findOrCreate({
          where: {
            name: tag.name.toLowerCase(),
            UserId: uid
          }
        });
      })
      .then(tags => {
        tags = tags.map(tag => {
          return tag[0];
        });
        return item.setTags(tags).then(() => item);
      });
  }

  return item;
}

// Delete item
export async function remove(parentValue, { id }, ctx) {
  const uid = auth(ctx);
  return await models.Item.destroy({ where: { id, UserId: uid } });
}
