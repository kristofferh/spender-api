import {
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList
} from "graphql";

import { mutationWithClientMutationId, fromGlobalId } from "graphql-relay";

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
      },
      color: {
        type: GraphQLString
      }
    };
  }
});

// Create item
export const addItem = mutationWithClientMutationId({
  name: "AddItem",
  inputFields: {
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
  outputFields: {
    item: {
      type: ItemType,
      resolve: payload => payload
    }
  },
  mutateAndGetPayload: (input, context) => create(input, context)
});

// Edit item
export const editItem = mutationWithClientMutationId({
  name: "EditItem",
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
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
  outputFields: {
    item: {
      type: ItemType,
      resolve: payload => payload
    }
  },
  mutateAndGetPayload: (input, context) => {
    // const { id } = fromGlobalId(input.id);
    return edit(input, context);
  }
});

// Remove item
export const removeItem = {
  type: ItemType,
  args: {
    id: {
      type: GraphQLID
    }
  },
  resolve: remove
};
