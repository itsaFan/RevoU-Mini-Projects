const helmet = require("helmet");

const helmetConfig = (app) => {
  app.use(helmet());
  app.use(helmet.frameguard({ action: "sameorigin" }));
};

module.exports = { helmetConfig };
