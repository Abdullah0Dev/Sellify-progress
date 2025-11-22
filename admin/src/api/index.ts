import axios from "axios";

// create axios instance
const axiosInstance = axios.create({
  // base url => http://localhost:4000/api/products'
  baseURL: `http://localhost:4000/api/products`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Type for the product item
export type ProductType = {
  _id?: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  average_rating: number | string;
  images: string[];
  prices: { size: "S" | "M" | "L"; price: number | string }[];
  quantity: number;
};
// Get All Products
const getAllProducts = async () => {
  const res = await axiosInstance.get("/");
  return res.data;
};
// Get Single Products
const getProductById = async (id: string) => {
  const res = await axiosInstance.get(`/${id}`);
  return res.data;
};
// Create a new product
const createNewProduct = async (product: ProductType) => {
  const res = await axiosInstance.post(`/`, product);
  return res.data;
};
// update a  product => ID
const updateProduct = async (id: string, product: Partial<ProductType>) => {
  const res = await axiosInstance.put(`/${id}`, product);
  return res.data;
};
// delete a  product => ID
const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/${id}`);
  return res.data;
};
// export all api functions
export {
  getAllProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
