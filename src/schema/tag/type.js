// Imports
import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat
} from "graphql";

import ItemType from "../item/type";

const TagType = new GraphQLObjectType({
  name: "Tag",
  description: "This represents a Tag",

  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    color: {
      type: GraphQLString
    },
    total: {
      type: GraphQLFloat,
      resolve(tag) {
        if (tag && tag.dataValues) {
          return Number(tag.dataValues.total);
        }
      }
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve(tag) {
        return tag.getItems();
      }
    }
  })
});

export default TagType;
