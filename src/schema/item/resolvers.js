// App Imports
import models from "../../models";

// Get item by ID
export async function getById(parentValue, { id }) {
  return await models.Item.findOne({ where: { id } });
}

// Get all items
export async function getAll(parentValue, { limit, offset, order }) {
  return await models.Item.findAll({
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

// Delete item
export async function remove(parentValue, { id }) {
  return await models.Item.destroy({ where: { id } });
}
