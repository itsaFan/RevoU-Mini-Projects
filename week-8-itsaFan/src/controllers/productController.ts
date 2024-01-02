import express from "express";
import { Product, deleteProductById, products } from "../data/product";

// Get All Product
export const getAllProducts = (req: express.Request, res: express.Response) => {
  res.json(products);
};

export const addProduct = (req: express.Request, res: express.Response) => {
  // console.log('Request Body:', req.body);

  const newProducts: Product[] = req.body;

  newProducts.forEach((newProduct) => {
    products.push(newProduct);
  });
  // res.status(201).send("Products added successfully");
  res.status(201).json({ message: "Product successfully added", newProducts });
  // console.log('Hasil:', newProducts);
};

// Search product by id
export const getProductById = (req: express.Request, res: express.Response) => {
  const productId = req.params.id;
  const product = products.find((product) => product.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "No Product Found! :(" });
  }
};

// Update Product
export const updateProduct = (req: express.Request, res: express.Response) => {
  const productId = req.params.id;
  const updatedProduct = req.body;
  const productIndex = products.findIndex((product) => product.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updatedProduct };
    res.json(products[productIndex]);
  } else {
    res.status(404).json({ error: "No Product Found! :(" });
  }
};

// Delete Product
export const deleteProduct = (req: express.Request, res: express.Response) => {
  const productId = req.params.id;
  const productDeleted = deleteProductById(productId);
  if (productDeleted) {
    res.status(201).send("The Product Have Been Successfully Deleted :)");
  } else {
    res.status(404).json({ error: "No Product Found! :(" });
  }
};
