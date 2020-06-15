import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import models from "models";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

export const createTokens = user => {
  const token = sign(
    {
      user: {
        id: user.get("id"),
        email: user.get("email"),
        username: user.get("username"),
        role: user.get("role")
      }
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1hr"
    }
  );

  const refreshToken = sign(
    {
      user: {
        id: user.get("id"),
        invalidationCount: user.get("invalidationCount")
      }
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d"
    }
  );

  return { token, refreshToken };
};

// Return a generic message instead of divulging a valid email login
const invalidCredentialsResponse = {
  ok: false,
  errors: [
    {
      path: "invalid-credentials",
      message: "Error! Invalid credentials."
    }
  ]
};

export const tryLogin = async (email, password) => {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
  const user = await models.User.where({ email }).fetch();
  if (!user) return invalidCredentialsResponse;

  console.log("user", user.attributes);

  const valid = await bcrypt.compare(password, user.get("passwordDigest"));
  if (!valid) return invalidCredentialsResponse;

  console.log("valid?", valid);

  const refreshSecret = user.get("passwordDigest") + REFRESH_TOKEN_SECRET;
  const { token, refreshToken } = createTokens(
    user,
    ACCESS_TOKEN_SECRET,
    refreshSecret
  );

  return {
    ok: true,
    token: token,
    refreshToken: refreshToken
  };
};
