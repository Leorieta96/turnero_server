const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(process.env.NODE_ENV + '.env')
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST || '127.0.0.1',
  PORT: process.env.PORT || 4000,
  DB_MONGO: process.env.DB_MONGO || 'mongodb+srv://mamAntula20:mamAntula20@cluster0.htaib.mongodb.net/mamantulaShifter?retryWrites=true&w=majority',
  SECRETA : 'secretamamantula'
}