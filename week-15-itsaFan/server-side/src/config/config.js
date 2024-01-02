require("dotenv").config();

const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGODB_URI,
  tokenSecret: process.env.JWT_SECRET,
  mainUrl: process.env.MAIN_URL,
  altUrl: process.env.ALT_URL,
};

module.exports = config;
