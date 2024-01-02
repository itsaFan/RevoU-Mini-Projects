require("dotenv").config();

const config = {
  port: process.env.PORT,
  tokenSecret: process.env.JWT_SECRET,
};


export default config;

