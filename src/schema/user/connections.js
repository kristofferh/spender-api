import { GraphQLInt, GraphQLEnumType } from "graphql";
import { createConnection } from "graphql-sequelize";
import moment from "moment";

import models from "../../models";

import ItemType from "../item/type";
import TagType from "../tag/type";

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
    count: {
      type: GraphQLInt,
      resolve: ({ source }) => {
        return source.countItems();
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
  }
});
