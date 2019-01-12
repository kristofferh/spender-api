import crypto from "crypto";
import sgMail from "@sendgrid/mail";
import jwt from "jsonwebtoken";

import models from "../../models";
import config from "../../config";

const env = process.env.NODE_ENV || "development";

async function createAndStoreToken(uid, delivery, ttl = 3600000, origin) {
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
      origin,
      delivery
    });
    return hashedToken;
  } catch (err) {
    return false;
  }
}

async function deliverEmail(to, url) {
  const msg = {
    to: to,
    from: "kris@k-create.com",
    subject: "Spender Login Verification",
    text: `Hello, here's your login link.\n ${url}`,
    html: `<p>Hello,</p><p>Here's your login link.</p><p><a href="${url}">${url}</a></p>`
  };
  try {
    return await sgMail.send(msg);
  } catch (err) {
    throw new Error(err);
  }
}

// Request a new token. Will find or create a user, create a new token based on
// the id, deliver the token and return.
export async function requestToken(
  _,
  { delivery, deliveryType = "email", deliveryPlatform = "web", ttl, origin }
) {
  // @todo: add more unique fields (i.e. phone number);
  const findOrCreateUser = await models.User.findOrCreate({
    where: { email: delivery }
  });
  const [User] = findOrCreateUser;
  let deliveryStatus;
  const token = await createAndStoreToken(User["id"], delivery, ttl, origin);

  if (!token) {
    return false;
  }

  let verifyUrl = `${
    config[env].webEndpoint
  }/verify?token=${token}&delivery=${encodeURIComponent(delivery)}`;

  // @todo: add allowed deliveryPlatforms.
  if (deliveryPlatform === "ios") {
    verifyUrl = `${verifyUrl}&platform=ios`;
  }

  // @todo: add more delivery mechanisms.
  if (deliveryType !== "email") {
    deliveryStatus = false;
  } else {
    try {
      await deliverEmail(delivery, verifyUrl);
      deliveryStatus = true;
    } catch (e) {
      deliveryStatus = false;
    }
  }
  return deliveryStatus;
}

// Verify token then delete it, create new jwt token and return it.
// Throws if anything goes wrong along the way
export async function verify(_, { delivery, token }) {
  try {
    const modelToken = await models.UserToken.findOne({
      where: { delivery, token }
    });

    if (!modelToken) {
      throw new Error("Invalid token");
    }

    if (Date.now() > modelToken.ttl) {
      throw new Error("Token expired");
    }

    const removeToken = await models.UserToken.destroy({
      where: { token }
    });

    if (!removeToken) {
      throw new Error("Something went wrong");
    }

    const jwtToken = jwt.sign({ id: modelToken.uid }, process.env.SECRET);
    return { token: jwtToken };
  } catch (e) {
    return e;
  }
}
