// Imports
import { GraphQLString, GraphQLInt, GraphQLNonNull } from "graphql";

import TagType from "./type";
import { create, remove } from "./resolvers";

// Create tag
export const addTag = {
  type: TagType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    description: {
      type: GraphQLString
    },
    color: {
      type: GraphQLString
    }
  },
  resolve: create
};

// Remove tag
export const removeTag = {
  type: TagType,
  args: {
    id: {
      type: GraphQLInt
    }
  },
  resolve: remove
};
