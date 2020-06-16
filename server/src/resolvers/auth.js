import { promisify } from "util";
import crypto from "crypto";
import { UserInputError, ApolloError } from "apollo-server-express";
import { tryLogin, createTokens } from "services/auth";
import { formatErrors } from "services/errors";
import mailer from "services/mailer";
import { SuccessResponse } from "utils/responses";

const TWENTY_FOUR_HOURS = 60 * 60 * 24 * 1000;
const APP_DOMAIN = process.env.APP_DOMAIN || "localhost";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

export default {
  Query: {
    me: async (_, __, { req, models }) => {
      if (!req.user || !req.user.id) return null;
      const user = await models.User.where({ id: req.user.id }).fetch();
      return user.toJSON();
    }
  },
  Mutation: {
    register: async (parent, args, { models }) => {
      try {
        const existingUser = await models.User.findOne(
          { email: args.email },
          { require: false }
        );
        if (existingUser) {
          throw new UserInputError("Please pick a unique email.");
        }
        const user = await models.User.create(args);
        if (user) {
          return new SuccessResponse(createTokens(user));
        }
      } catch (err) {
        console.error(err);
        throw new ApolloError(err.message, "UNKNOWN_ERROR", {
          errors: formatErrors(err)
        });
      }
    },
    login: async (_, { email, password }) => tryLogin(email, password),
    invalidateTokens: async (parent, args, { req, models }) => {
      if (!req.user) {
        return false;
      }

      const user = await models.User.where({ id: req.user }).fetch();
      if (!user) {
        return false;
      }

      user.set("invalidationCount", user.get("invalidationCount") + 1).save();

      return true;
    },
    forgotPassword: async (parent, { email }, { models }) => {
      try {
        const user = await models.User.where({ email }).fetch();
        // TODO Consider removing this message or not passing it client at least
        if (!user) throw new Error("User not found for this email address");

        const randomBytes = promisify(crypto.randomBytes);
        const buffer = await randomBytes(20);
        const token = buffer.toString("hex");
        user.set("passwordResetToken", token);
        user.set("passwordResetExpires", Date.now() + TWENTY_FOUR_HOURS);
        await user.save();

        const emailData = {
          to: user.get("email"),
          from: `no-reply@${APP_DOMAIN}`,
          template: "forgot-password",
          subject: "Password help has arrived!",
          context: {
            url: `${CLIENT_URL}/reset-password?token=${token}`,
            name: user.get("email")
          }
        };

        await mailer.sendMail(emailData);

        return {
          ok: true
        };
      } catch (err) {
        console.log("err", err);
        return {
          ok: false,
          error: formatErrors(err)
        };
      }
    },
    resetPassword: async (
      _,
      { token, password, passwordConfirm },
      { models }
    ) => {
      try {
        const user = await models.User.where({ password_reset_token: token })
          .where("password_reset_expires", ">", Date.now())
          .fetch();
        if (!user) throw new Error("Invalid password reset token!");
        if (password !== passwordConfirm) {
          throw new Error("Passwords don't match!");
        }
        user.set("password", password);
        user.set("passwordResetToken", null);
        user.set("passwordResetExpires", null);
        await user.save();
        const emailData = {
          to: user.get("email"),
          from: `no-reply@${APP_DOMAIN}`,
          template: "password-reset",
          subject: "Password Reset Confirmation",
          context: {
            name: user.get("email")
          }
        };
        await mailer.sendMail(emailData);
        return {
          ok: true
        };
      } catch (err) {
        console.log("err", err);
        return {
          ok: false,
          errors: formatErrors(err)
        };
      }
    }
  }
};
