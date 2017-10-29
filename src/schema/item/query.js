import { GraphQLInt, GraphQLList } from "graphql";

import ItemType from "./type";
import { getAll, getById } from "./resolvers";

// Thoughts All
export const items = {
  type: new GraphQLList(ItemType),
  resolve: getAll
};

// Thought By ID
export const item = {
  type: ItemType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
};
