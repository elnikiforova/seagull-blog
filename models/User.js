// поля: имя (required), возраст, био (required)
const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  bio: String,
  email: {
    type: String,
    required: [true, 'Пожалуйста, введите имейл'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Пожалуйста, введите правильный имейл']
  },
  password: {
    type: String,
    required: [true, 'Пожалуйста, создайте пароль'],
    minLength: [6, 'Пароль должен содержать не менее 6 символов']
  },
});

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
  console.log('new user was created and saved', doc);
  next();
})

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log('user about to be created and saved', this);
  next();
})

// static method to log in the user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrent password');
  }
  throw Error('incorrect email');
}

module.exports = model('User', userSchema);
