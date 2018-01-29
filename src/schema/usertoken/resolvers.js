import crypto from "crypto";
import sgMail from "@sendgrid/mail";

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
    html: `<p>Hello, here's your login link.</p><p>${url}</p>`
  };
  try {
    return await sgMail.send(msg);
  } catch (err) {
    console.log(err);
    throw new Error(err);
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
  let deliveryStatus;
  const token = await createAndStoreToken(User["id"], ttl, origin);

  if (!token) {
    return false;
  }

  // @todo: add more delivery mechanisms.
  if (delivery !== "email") {
    deliveryStatus = false;
  } else {
    try {
      await deliverEmail(
        email,
        `http://localhost:3000/verify?token=${token}&email=${encodeURIComponent(
          email
        )}`
      );
      deliveryStatus = true;
    } catch (e) {
      deliveryStatus = false;
    }
  }
  return deliveryStatus;
}
