import {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList
} from "graphql";

import ItemType from "./type";
import { create, remove, edit } from "./resolvers";

const TagInput = new GraphQLInputObjectType({
  name: "TagInput",
  description: "This represents a Tag Input",
  fields: () => {
    return {
      name: {
        type: GraphQLString
      },
      description: {
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

// Edit item
export const editItem = {
  type: ItemType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
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
  resolve: edit
};

// Remove item
export const removeItem = {
  type: ItemType,
  args: {
    id: {
      type: GraphQLInt
    }
  },
  resolve: remove
};
