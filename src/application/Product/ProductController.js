// /* eslint-disable class-methods-use-this */
// /* eslint-disable consistent-return */
// import autoBind from "auto-bind";
// import ProductService from "../../domain/Product/ProductService";

// const productService = new ProductService();

// class ProductController {
//   constructor() {
//     this.productService = productService;
//     autoBind(this);
//   }

//   async test(req, res, next) {
//     try {
//       /*  #swagger.tags = ['TST']
//                 #swagger.description = 'Endpoint testing' */
//       const response = {
//         name: "aylmao",
//         ...req.user,
//       };
//       /* #swagger.responses[200] = {
//                       schema: { "$ref": "#/definitions/tst" },
//                       description: "TST successfully." } */
//       return res.status(200).json(response);
//     } catch (e) {
//       next(e);
//     }
//   }

//   async getAll(req, res, next) {
//     try {
//       const result = await productService.getAll();

//       return res.status(result.status).json(result);
//     } catch (e) {
//       next(e);
//     }
//   }

//   async insert(req, res, next) {
//     try {
//       const data = req.body;
//       data.ownerId = req.user.id;
//       const response = await productService.insert(data);

//       return res.status(response.statusCode).json(response);
//     } catch (e) {
//       next(e);
//     }
//   }

//   async update(req, res, next) {
//     const id = req.params;

//     try {
//       const response = await productService.update(id, req.body);

//       return res.status(response.statusCode).json(response);
//     } catch (e) {
//       next(e);
//     }
//   }

//   async delete(req, res, next) {
//     const id = req.params;

//     try {
//       const response = await productService.delete(id);

//       return res.status(response.statusCode).json(response);
//     } catch (e) {
//       next(e);
//     }
//   }
// }
// export default new ProductController();
