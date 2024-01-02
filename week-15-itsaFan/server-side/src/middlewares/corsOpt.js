const config = require("../config/config");


const corsOption = (req, callback) => {
  const originUrl = [config.mainUrl, config.altUrl];
  let corsOptions;

  if (originUrl.includes(req.header("Origin"))) {
    if (req.header("Origin") === config.mainUrl) {
      corsOptions = { origin: true, methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"] };
    } else {
      corsOptions = { origin: true, methods: ["GET", "POST"] };
    }
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

module.exports = { corsOption };
