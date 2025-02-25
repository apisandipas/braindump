import db, { ModelBase } from "database";
import Note from "./note";
import User from "./user";
import Joi from "@hapi/joi";

const Tag = ModelBase.extend({
  tableName: "tags",
  notes() {
    return this.belongsToMany(Note);
  },
  user() {
    return this.belongsTo(User);
  },
  validate: {
    name: Joi.string().min(3).max(30).required()
  }
});

export default db.model("Tag", Tag);
