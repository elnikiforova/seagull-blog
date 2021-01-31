// поля: название (required), ссылки на записи (required)
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

module.exports = model('Tag', tagSchema);
