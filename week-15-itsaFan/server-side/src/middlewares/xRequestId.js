const uuid = require("uuid");

const xRequestId = (req, res, next) => {
  // console.log("Middleware executed");
  if (req.headers["x-request-id"]) {
    res.setHeader(`x-request-id`, req.headers[`x-request-id`]);
  } else {
    const requestId = uuid.v4();
    res.setHeader("x-request-id", requestId);
    // console.log("X-Request-Id is set to:", requestId);
    // req.request_id = requestId;
  }
  next();
};

module.exports = { xRequestId };