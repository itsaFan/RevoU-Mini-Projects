import express from "express";
import appConfig from "./config/config";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Server Port
app.listen(appConfig.port, () => {
  console.log(`Server listening on port ${appConfig.port}`);
});
