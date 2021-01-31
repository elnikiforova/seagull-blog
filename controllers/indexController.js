const User = require('../models/User');
const Entry = require('../models/Entry');
const Tag = require('../models/Tag');

module.exports.indexGet = async (req, res) => {
  const users = await User.find({});
  res.render('index', { title: 'Чехов', users });
}

module.exports.entriesGet = async (req, res) => {
  const entries = await Entry.find({}).sort({ createdAt: 1 });
  res.render('entries/blogs', { title: 'Читать', entries });
}
