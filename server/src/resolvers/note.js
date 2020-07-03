import { knex } from "database";
import { UnauthorizedError, ApolloError } from "apollo-server-express";
import { SuccessResponse } from "utils/responses";

export default {
  Note: {
    tags: async (parent, args, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        // TODO Refactor this when I figure out how to access the related tags directly
        const tagIds = await knex("notes_tags")
          .where("note_id", parent.id)
          .map(i => i.tag_id);
        const tags = await models.Tag.where("id", "IN", tagIds)
          .where({ user_id: req.user })
          .fetchAll();
        if (tags) {
          return tags.toJSON();
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    }
  },
  Query: {
    getNote: async (parent, { id }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const note = await models.Note.where({
          id,
          user_id: req.user
        }).fetch();
        return note.toJSON();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    allNotes: async (parent, args, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }

      try {
        const notes = await models.Note.where({
          user_id: req.user
        })
          .orderBy("updated_at", "DESC")
          .fetchAll();
        return notes.toJSON();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    notesByNotebook: async (parent, { notebookId }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }

      try {
        const notes = await models.Note.where({
          notebook_id: notebookId,
          user_id: req.user
        })
          .orderBy("updated_at", "DESC")
          .fetchAll();

        const notebook = await models.Notebook.where({
          id: notebookId
        }).fetch();

        return new SuccessResponse({
          notes: notes.toJSON(),
          notebook: notebook.toJSON()
        });
      } catch (err) {
        throw new ApolloError(err.message);
      }
    }
  },
  Mutation: {
    createNote: async (parent, { values }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized");
      }
      try {
        const note = await models.Note.create({ ...values, user_id: req.user });
        if (note) {
          return new SuccessResponse({
            note: note.toJSON()
          });
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    updateNote: async (parent, { id, values }, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const note = await models.Note.update(values, {
          id,
          user_id: req.user
        });
        if (note) {
          return new SuccessResponse({
            note: note.toJSON()
          });
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    deleteNote: async (parent, args, { models, req }) => {
      if (!req.user) {
        throw new UnauthorizedError("Unauthorized!");
      }
      try {
        const note = await models.Note.where({ user_id: req.user }).find();
        if (note) {
          await models.Note.destroy(args);
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    }
  }
};
