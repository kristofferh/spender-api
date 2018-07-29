import { GraphQLInt, GraphQLEnumType } from "graphql";
import { createConnection } from "graphql-sequelize";

import models from "../../models";
import { auth } from "../../services/auth";

import ItemType from "../item/type";
import TagType from "../tag/type";

const { Item, Tag } = models;

export const userItemsConnection = createConnection({
  name: "UserItems",
  nodeType: ItemType,
  target: Item, // Can be an association for parent related connections or a model for "anonymous" connections
  // if no orderBy is specified the model primary key will be used.
  orderBy: new GraphQLEnumType({
    name: "UserItemsOrderBy",
    values: {
      DATE: { value: ["date", "DESC"] }, // The first ENUM value will be the default order. The direction will be used for `first`, will automatically be inversed for `last` lookups.
      AMOUNT: { value: ["amount", "DESC"] }
    }
  }),
  before: (findOptions, args, context) => {
    const id = auth(context);
    findOptions.where = { UserId: id };
    return findOptions;
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
  target: Tag,
  orderBy: new GraphQLEnumType({
    name: "UserTagsOrderBy",
    values: {
      NAME: { value: ["name", "ASC"] }
    }
  }),
  before: (findOptions, args, context) => {
    const id = auth(context);
    findOptions.where = { UserId: id };
    return findOptions;
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
