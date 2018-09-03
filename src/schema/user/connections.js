import { GraphQLInt, GraphQLFloat, GraphQLEnumType } from "graphql";
import { createConnection } from "graphql-sequelize";

import { avg, sum, toDecimal, median } from "../../utils/math";

import models from "../../models";

import ItemType from "../item/type";
import TagType from "../tag/type";

import { getById } from "../tag/resolvers";

const { User, Sequelize: { Op } } = models;

export const userItemsConnection = createConnection({
  name: "UserItems",
  nodeType: ItemType,
  target: User.Items, // Can be an association for parent related connections or a model for "anonymous" connections
  // if no orderBy is specified the model primary key will be used.
  orderBy: new GraphQLEnumType({
    name: "UserItemsOrderBy",
    values: {
      DATE: { value: ["date", "DESC"] }, // The first ENUM value will be the default order. The direction will be used for `first`, will automatically be inversed for `last` lookups.
      AMOUNT: { value: ["amount", "DESC"] }
    }
  }),
  where: (key, value, previousWhere) => {
    if (key === "description") {
      return {
        [key]: { [Op.iLike]: `%${value}%` }
      };
    }

    if (key === "startDate") {
      const existingDate = previousWhere.date || {};
      return {
        date: {
          ...existingDate,
          [Op.gte]: value
        }
      };
    }

    if (key === "endDate") {
      const existingDate = previousWhere.date || {};
      return {
        date: {
          ...existingDate,
          [Op.lte]: value
        }
      };
    }

    return { [key]: value };
  },
  connectionFields: {
    totalCount: {
      type: GraphQLInt,
      description: "The total number of items.",
      resolve: ({ source }) => {
        return source.countItems();
      }
    },
    count: {
      type: GraphQLInt,
      description: "The number of items in the result set.",
      resolve: ({ source, where }) => {
        return source.countItems({ where });
      }
    },
    sum: {
      type: GraphQLFloat,
      description: "The sum of the items in the result set.",
      resolve: ({ source, where }) => {
        return source.getItems({ where }).then(items => {
          const values = items.map(item => Number(item.dataValues.amount));
          return toDecimal(sum(values));
        });
      }
    },
    avg: {
      type: GraphQLFloat,
      description: "The mean of the items in the result set.",
      resolve: ({ source, where }) => {
        return source.getItems({ where }).then(items => {
          const values = items.map(item => Number(item.dataValues.amount));
          return toDecimal(avg(values));
        });
      }
    },
    median: {
      type: GraphQLFloat,
      description: "The median of the items in the result set.",
      resolve: ({ source, where }) => {
        return source.getItems({ where }).then(items => {
          const values = items.map(item => Number(item.dataValues.amount));
          return items.length ? toDecimal(median(values)) : 0;
        });
      }
    }
  }
});

export const userTagsConnection = createConnection({
  name: "UserTags",
  nodeType: TagType,
  target: User.Tags,
  orderBy: new GraphQLEnumType({
    name: "UserTagsOrderBy",
    values: {
      NAME: { value: ["name", "ASC"] }
    }
  }),
  connectionFields: {
    total: {
      type: GraphQLInt,
      resolve: ({ source }) => {
        return source.countTags();
      }
    }
  },
  edgeFields: {
    total: {
      type: GraphQLFloat,
      resolve: ({ node, sourceArgs }, _, ctx) => {
        let where = {};
        let date = {};
        const { startDate, endDate } = sourceArgs;
        if (startDate) {
          date = {
            [Op.gte]: startDate
          };
          where = {
            date
          };
        }

        if (endDate) {
          where = {
            date: {
              ...date,
              [Op.lte]: endDate
            }
          };
        }

        return getById(node, where, ctx).then(item => {
          if (item) {
            return item.dataValues.total;
          }
          return 0;
        });
      }
    },
    count: {
      type: GraphQLInt,
      resolve: ({ node, sourceArgs }, _, ctx) => {
        // @todo: combine this into one helper function.
        const { startDate, endDate } = sourceArgs;
        let where = {};
        let date = {};
        if (startDate) {
          date = {
            [Op.gte]: startDate
          };
          where = {
            date
          };
        }

        if (endDate) {
          where = {
            date: {
              ...date,
              [Op.lte]: endDate
            }
          };
        }
        return getById(node, where, ctx).then(item => {
          if (item) {
            return item.dataValues.count;
          }
          return 0;
        });
      }
    }
  }
});
