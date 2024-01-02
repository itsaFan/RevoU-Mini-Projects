const express = require("express");
const config = require("./src/config/config");
const cors = require("cors");
const dbConnection = require("./src/utils/db-util");
const authRoutes = require("./src/routes/authRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const leadRoutes = require("./src/routes/leadRoutes");
const userRoutes = require("./src/routes/userRoutes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");

const app = express();
app.use(cors());
app.use(express.json());

dbConnection();

const swaggerDocument = YAML.load("./src/doc/openapi.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  console.log("Validator working. . .");
  next();
});
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./src/doc/openapi.yaml",
    validateRequests: true,
  })
);

app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leader", leadRoutes);
app.use("/api/user", userRoutes);

//Open-api error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(config.port, () => 
    console.log(`Server is running on port ${config.port}`)
);
