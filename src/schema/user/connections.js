import { GraphQLInt, GraphQLEnumType } from "graphql";
import { createConnection } from "graphql-sequelize";

import models from "../../models";

import ItemType from "../item/type";
import TagType from "../tag/type";

const { User, Sequelize } = models;

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
  where: function(key, value) {
    if (key === "description") {
      return { [key]: { [Sequelize.Op.iLike]: `%${value}%` } };
    } else {
      return { [key]: value };
    }
  },
  connectionFields: {
    total: {
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
