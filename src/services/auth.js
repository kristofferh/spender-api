import jwt from "jsonwebtoken";

export const auth = ({ headers }) => {
  const authorization = headers.authorization;
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    const { id } = jwt.verify(token, "pizza");
    // @todo: add scope.
    return id;
  }

  throw new Error("Not authenticated");
};
