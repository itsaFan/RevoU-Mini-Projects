const express = require("express");
const config = require("./config/config");
const cors = require("cors");
const dbConnection = require("./utils/db-util");
const routes = require("./routes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const { corsOption, helmetConfig, morganConfig } = require("./middlewares");
const escapeHtml = require("escape-html");

//general setup
const app = express();
app.use(cors(corsOption));
helmetConfig(app);
morganConfig(app);
app.use(express.json());
dbConnection();

//click-jacking test & xss test
app.get("/click-jacking-xss", (req, res) => {
  const name = req.query.name ? escapeHtml(req.query.name) : "Guest";
  res.send(`
    <h1>Hello ${name}</h1><br />
    <p> XSS Test and Click Jacking Test</p>
   `);
});

//CORS Testing
app.get("/test-cors", (req, res) => {
  res.json({ message: "CORS whitelist & methods unit-testing" });
});

//Swagger Config
const swaggerDocument = YAML.load("./src/doc/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use((req, res, next) => {
//   console.log("Validator working. . .");
//   next();
// });
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./src/doc/openapi.yaml",
    validateRequests: true,
  })
);

//App Routes
app.use(routes);

//Open-api error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(config.port, () => console.log(`Server is running on port ${config.port}`));

module.exports = app;
