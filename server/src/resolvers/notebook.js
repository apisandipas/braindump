import { UnauthorizedError, ApolloError } from "apollo-server-express";
import { SuccessResponse } from "apollo-server-express";

export default {
  Notebook: {
    notes: async (parent, args, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const notes = await models.Note.where({
          notebook_id: parent.id,
          user_id: req.user
        }).fetchAll();
        return notes.toJSON();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    }
  },
  Query: {
    getNotebook: async (parent, { id }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const notebook = await models.Notebook.where({
          id,
          user_id: req.user
        }).fetch();
        return notebook.toJSON();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    allNotebooks: async (parent, args, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const notebooks = await models.Notebook.where({
          user_id: req.user
        }).fetchAll();
        return notebooks.toJSON();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    }
  },
  Mutation: {
    createNotebook: async (parent, { values }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const notebook = await models.Notebook.create({
          ...values,
          user_id: req.user
        });
        if (notebook) {
          return new SuccessResponse({ notebook: notebook.toJSON() });
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    updateNotebook: async (parent, { id, values }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const notebook = await models.Notebook.update(values, {
          id,
          user_id: req.user
        });
        if (notebook) {
          return new SuccessResponse({
            notebook: notebook.toJSON()
          });
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    deleteNotebook: async (parent, args, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const notebook = await models.Notebook.where({
          user_id: req.user
        }).find();
        if (notebook) {
          await models.Notebook.destroy(args);
          return true;
        }
      } catch (err) {
        return false;
      }
    }
  }
};
