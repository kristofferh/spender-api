// Imports
import {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull
} from "graphql";

// App Imports
import ItemType from "./type";
import { create, remove } from "./resolvers";

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
