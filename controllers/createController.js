const Entry = require('../models/Entry');
const Tag = require('../models/Tag');

module.exports.createGet = (req, res) => {
  res.render('entries/create', { title: 'Сказать' });
}

module.exports.createPost = async (req, res) => {
  const {
    title, author, tags, blog,
  } = req.body;

  // запись блога в базу данных
  const entry = new Entry({ title, author, blog });
  await entry.save();

  // запись тегов в базу данных
  const tagArray = tags.split(' ').filter((word) => word.length > 0);
  const tagIDarr = await tagArray.map((el) => {
    const tag = new Tag({ title: el });
    tag.save();
    return tag.id;
  });

  // апдейт тегов в блог-посте
  tagIDarr.forEach(async (id) => {
    await Entry.updateOne({ _id: entry.id }, { $push: { tags: id } });
  });

  // апдейт имен тегов в посте
  tagArray.forEach(async (name) => {
    await Entry.updateOne({ _id: entry.id }, { $push: { tagnames: name } });
  });

  res.redirect('/entries');
}
