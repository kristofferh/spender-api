import crypto from "crypto";

import models from "../../models";

async function createAndStoreToken(uid, ttl = 3600000, origin) {
  const seed = crypto.randomBytes(20);
  const hashedToken = crypto
    .createHash("sha1")
    .update(seed + uid)
    .digest("hex");

  try {
    await models.UserToken.upsert({
      token: hashedToken,
      ttl: Date.now() + ttl,
      uid,
      origin
    });
    return true;
  } catch (err) {
    return false;
  }
}

// Request a new token. Will find or create a user, create a new token based on
// the id, deliver the token and return.
export async function requestToken(
  _,
  { email, delivery = "email", ttl, origin }
) {
  const findOrCreateUser = await models.User.findOrCreate({ where: { email } });
  const [User] = findOrCreateUser;

  const getToken = await createAndStoreToken(User["id"], ttl, origin);
  // add delivery method.
  return getToken;
}
