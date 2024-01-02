const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const requestLogStream = fs.createWriteStream(path.join(logDirectory, "request.log"), { flags: "a" });

const morganConfig = (app) => {
  app.use(morgan("combined", { stream: requestLogStream }));
};

module.exports = {
  morganConfig,
};
