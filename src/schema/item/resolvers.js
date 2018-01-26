import models from "../../models";
import { auth } from "../../services/auth";

// Get item by ID
export async function getById(parentValue, { id }) {
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
  { month, year, limit, offset, order }
) {
  const { sequelize, Sequelize } = models;
  return await models.Item.findAll({
    where: {
      [Sequelize.Op.and]: [
        sequelize.where(sequelize.fn("YEAR", sequelize.col("date")), year),
        sequelize.where(sequelize.fn("MONTH", sequelize.col("date")), month)
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

// Create item
export async function create(parentValue, { date, amount, description, tags }) {
  // Make sure that the user is authorized to insert here / get userid.
  return await models.Item
    .create({
      date: date,
      amount: amount,
      description: description,
      UserId: 1
    })
    .then(item => {
      if (tags) {
        return models.Sequelize.Promise
          .map(tags, tag => {
            return models.Tag.findOrCreate({
              where: {
                name: tag.name.toLowerCase(),
                UserId: 1
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
export async function edit(
  parentValue,
  { id, date, amount, description, tags }
) {
  // Make sure that the user is authorized to insert here / get userid.
  await models.Item.update(
    {
      date: date,
      amount: amount,
      description: description,
      UserId: 1
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
            UserId: 1
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
export async function remove(parentValue, { id }) {
  return await models.Item.destroy({ where: { id } });
}
