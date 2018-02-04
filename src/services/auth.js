import jwt from "jsonwebtoken";

import { UnauthorizedError } from "./error";

export const auth = ({ headers }) => {
  const authorization = headers.authorization;
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, "pizza");
    // @todo: add scope.
    return id;
  }

  throw new UnauthorizedError("Not authenticated");
};
