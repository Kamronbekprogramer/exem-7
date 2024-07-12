
import http from "./config";

const productsApi = {
  create: (data) => http.post("/product", data),
  get: (params) => http.get("/products", { params }),
  delete: (id) => http.delete(`/product/${id}`),
  get_product: (id) => http.get(`/product/${id}`),
};

export const get_product = productsApi.get_product;

export default productsApi;
