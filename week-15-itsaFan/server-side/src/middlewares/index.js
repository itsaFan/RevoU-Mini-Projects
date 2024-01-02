const { verifyJWT } = require("./verifyJWT");
const { checkRole } = require("./checkRole");
const { xRequestId } = require("./xRequestId");
const { helmetConfig } = require("./helmet");
const { corsOption } = require("./corsOpt");
const { morganConfig } = require("./morgan");

module.exports = {
  verifyJWT,
  checkRole,
  xRequestId,
  corsOption,
  helmetConfig,
  morganConfig,
};
