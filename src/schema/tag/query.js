import { GraphQLInt, GraphQLList } from "graphql";

import TagType from "./type";
import { getAll, getById } from "./resolvers";

// All tags
export const tags = {
  type: new GraphQLList(TagType),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt }
  },
  resolve: getAll
};

// Tag by ID
export const tag = {
  type: TagType,
  args: {
    id: { type: GraphQLInt }
  },
  resolve: getById
};
