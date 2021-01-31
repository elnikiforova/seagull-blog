const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3300;

// ********************* MONGOOSE CONNECTION

const dbName = process.env.DB_NAME;
const dbURL = process.env.DB_URL;

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log('Mongoose connected to %s database', dbName); })
  .catch((err) => { console.log('Database connection error', err.message); });

// ********************** END

app.listen(port, () => {
  console.log('Server started at http://localhost:%s/', port);
});
