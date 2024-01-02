export type Product = {
  id: string;
  title: string;
  description: string;
};

export let products: Product[] = [
  { id: "p1", title: "Product 1", description: "This is product 1" },
  { id: "p2", title: "Product 2", description: "This is product 2" },
  { id: "p3", title: "Product 3", description: "This is product 3" },
];

//Delete product by product id
export const deleteProductById = (productId: string) => {
  const initialLength = products.length;
  products = products.filter((product) => product.id !== productId);
  return products.length < initialLength;
};
