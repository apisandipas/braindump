import { SuccessResponse } from "utils/responses";
import { ApolloError, UnauthorizedError } from "apollo-server-express";

export default {
  Query: {
    getTag: async (parent, { id }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const tag = await models.Tag.where({
          user_id: req.user
        }).findById(id);
        return tag.toJSON();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    allTags: async (parent, args, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const tags = await models.Tag.where({
          user_id: req.user
        }).fetchAll();

        return tags.toJSON();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    }
  },
  Mutation: {
    createTag: async (parent, { values }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const tag = await models.Tag.create({ ...values, user_id: req.user });
        if (tag) {
          return new SuccessResponse({ tag: tag.toJSON() });
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    updateTag: async (parent, { id, values }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const tag = await models.Tag.update(values, { id, user_id: req.user });
        if (tag) {
          return new SuccessResponse({
            tag: tag.toJSON()
          });
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    deleteTag: async (parent, args, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const tag = await models.Tags.where({ ...args, user_id: req.user });
        if (tag) {
          await models.Tag.destroy(args);
          return true;
        }
      } catch (err) {
        return false;
      }
    }
  }
};
