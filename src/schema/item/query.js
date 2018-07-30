import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from "graphql";

import ItemType from "./type";
import { getAll, getById, getByMonth, getByTag } from "./resolvers";

// All items
export const items = {
  type: new GraphQLList(ItemType),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    order: { type: GraphQLString }
  },
  resolve: getAll
};

// All items by month
export const itemsByMonth = {
  type: new GraphQLList(ItemType),
  args: {
    month: { type: GraphQLInt },
    year: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    order: { type: GraphQLString }
  },
  resolve: getByMonth
};

// All items by tag
export const itemsByTag = {
  type: new GraphQLList(ItemType),
  args: {
    tagId: { type: GraphQLInt },
    month: { type: GraphQLInt },
    year: { type: GraphQLInt },
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    order: { type: GraphQLString }
  },
  resolve: getByTag
};

// Item by ID
export const item = {
  type: ItemType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: getById
};
