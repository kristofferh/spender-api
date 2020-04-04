import { GraphQLObjectType } from "graphql";

import * as item from "./item/query";
import * as user from "./user/query";
import * as tag from "./tag/query";

// Query
const query = new GraphQLObjectType({
  name: "query",
  description: "This is the root query",

  fields: () => ({
    ...item,
    ...user,
    ...tag,
  }),
});

export default query;
