import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";

import ItemType from "./type";
import { getAll, getById } from "./resolvers";

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

// Item by ID
export const item = {
  type: ItemType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
};
