// поля: ссылка на автора (required), название (required), боди (required), ссылки на теги
const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const Tag = require('./Tag');

const entrySchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  // author_id: { type: Schema.Types.ObjectId, ref: User },
  blog: { type: String, required: true },
  tagnames: [{ type: String }],
  tags: [{ type: Schema.Types.ObjectId, ref: Tag }],
}, { timestamps: true });

const Entry = model('Entry', entrySchema);

module.exports = Entry;
