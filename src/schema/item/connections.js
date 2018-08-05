import { GraphQLInt, GraphQLEnumType } from "graphql";
import { createConnection } from "graphql-sequelize";

import models from "../../models";

import TagType from "../tag/type";

const { Item } = models;

export const itemTagsConnection = createConnection({
  name: "ItesTags",
  nodeType: TagType,
  target: Item.Tags,
  orderBy: new GraphQLEnumType({
    name: "ItemTagsOrderBy",
    values: {
      NAME: { value: ["name", "ASC"] }
    }
  }),
  connectionFields: {
    count: {
      type: GraphQLInt,
      resolve: ({ source }) => {
        return source.countTags();
      }
    }
  }
});
