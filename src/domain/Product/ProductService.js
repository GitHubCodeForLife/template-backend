// import Product from "./productDomainModel.js";
// import BaseSevice from "../../../base/BaseService.js";
// import autoBind from "auto-bind";
// import { newProduct } from "./productFactory.js";
// import ProductRepository from "../../infrastructure/Product/ProductRepository.js";

// const productRepository = new ProductRepository();

// class ProductService extends BaseSevice {
//     constructor() {
//         super(Product);
//         autoBind(this);
//     }
//     async getAll() {
//         const response = {
//             status: "",
//             data: null,
//             message: "",
//         }
//         try {

//             const allProducts = await productRepository.getAllProduct();
//             if (allProducts.length > 0) {
//                 response.status = 200;
//                 response.data = allProducts;
//                 response.message = "list of all product";
//                 return response;

//             } else {
//                 response.status = 500;
//                 response.data = null;
//                 response.message = "No Product found";
//                 return response;
//             }

//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async insert(data) {
//         const response = {
//             status: "",
//             data: null,
//             message: "",
//         }
//         try {
//             const newProduct = newProduct(data);
//             if (newProduct.errMessage) {
//                 response.status = 400;
//                 response.data = null;
//                 response.message = newProduct.errMessage;
//                 return response;
//             }
//             const result = await productRepository.insert(newProduct.info);
//             if (result.isSuccess) {
//                 response.status = 200;
//                 response.data = result;
//                 response.message = "Product inserted successfully";
//                 return response;
//             } else {
//                 response.status = 500;
//                 response.data = null;
//                 response.message = result.message;
//                 return response;
//             }

//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async update(data) {
//         const response = {
//             status: "",
//             data: null,
//             message: "",
//         }
//         try {
//             const newProduct = newProduct(data);
//             if (newProduct.errMessage) {
//                 response.status = 400;
//                 response.data = null;
//                 response.message = newProduct.errMessage;
//                 return response;
//             }
//             const result = await productRepository.update(newProduct.info.id, newProduct.info);
//             if (result.isSuccess) {
//                 response.status = 200;
//                 response.data = result;
//                 response.message = "Product updated successfully";
//                 return response;
//             } else {
//                 response.status = 500;
//                 response.data = null;
//                 response.message = result.message;
//                 return response;
//             }

//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async delete(id) {
//         const response = {
//             status: "",
//             data: null,
//             message: "",
//         }
//         try {
//             const result = await productRepository.delete(id);
//             if (result.isSuccess) {
//                 response.status = 200;
//                 response.data = result;
//                 response.message = "Product deleted successfully";
//                 return response;
//             } else {
//                 response.status = 500;
//                 response.data = null;
//                 response.message = result.message;
//                 return response;
//             }

//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

//     async searchWithKeyWord(keyword) {
//         const response = {
//             status: "",
//             data: null,
//             message: "",
//         }
//         try {
//             const result = await productRepository.searchWithKeyWord(keyword);
//             if (result.length > 0) {
//                 response.status = 200;
//                 response.data = result;
//                 return response;
//             } else {
//                 response.status = 500;
//                 response.data = null;
//                 response.message = "No Product found";
//                 return response;
//             }

//         } catch (error) {
//             console.error(error);
//             throw error;
//         }
//     }

// }

// export default ProductService;
