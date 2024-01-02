const express = require("express");
const config = require("./src/config/config");
const userRoutes = require("./src/routes/userRoutes");
const { createConnection } = require("typeorm");
const ormconfig = require("./ormconfig");
const transactionRoutes = require("./src/routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api/user", transactionRoutes);

createConnection(ormconfig)
  .then((connection) => {
    console.log("Success connect to database");

    app.listen(config.port, () => {
      console.log(`Server is running at localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Error, connect to database failed:", error);
  });

