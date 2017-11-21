// Imports
import {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList
} from "graphql";

// App Imports
import ItemType from "./type";
import { create, remove } from "./resolvers";

const TagInput = new GraphQLInputObjectType({
  name: "TagInput",
  description: "This represents a Tag Input",
  fields: () => {
    return {
      name: {
        type: GraphQLString
      }
    };
  }
});

// Create item
export const addItem = {
  type: ItemType,
  args: {
    date: {
      type: GraphQLString
    },
    amount: {
      type: new GraphQLNonNull(GraphQLFloat)
    },
    description: {
      type: new GraphQLNonNull(GraphQLString)
    },
    tags: {
      type: new GraphQLList(TagInput)
    }
  },
  resolve: create
};

// Remove item
export const removeItem = {
  type: ItemType,
  args: {
    id: {
      name: "id",
      type: GraphQLInt
    }
  },
  resolve: remove
};
