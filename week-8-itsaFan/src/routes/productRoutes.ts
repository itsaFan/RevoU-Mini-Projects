import express from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/productController";
import { verifyJWT } from "../middlewares/verityJWT";
import { checkRoles } from "../middlewares/checkRoles";

const router = express.Router();

//all can see
router.get("/", getAllProducts);
//only authenticated user/admin can see
router.get("/:id", verifyJWT, getProductById);

//only authenticated admin can see
router.post("/add", verifyJWT, checkRoles(["admin"]), addProduct);
router.put("/:id", verifyJWT, checkRoles(["admin"]), updateProduct);
router.delete("/:id", verifyJWT, checkRoles(["admin"]), deleteProduct);

export default router;
