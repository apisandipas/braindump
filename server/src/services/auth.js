import { sign } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server-express";
import models from "models";
import { SuccessResponse } from "utils/responses";
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

export const tryLogin = async (email, password) => {
  const INVALID_CREDENTIALS_MSG = "Invalid credentials!";
  const user = await models.User.where({ email }).fetch();

  if (!user) throw new AuthenticationError(INVALID_CREDENTIALS_MSG);

  const valid = await bcrypt.compare(password, user.get("passwordDigest"));
  if (!valid) throw new AuthenticationError(INVALID_CREDENTIALS_MSG);

  return new SuccessResponse(createTokens(user));
};
