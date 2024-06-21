// // base on factory pattern .
// // In this file we will create a factory for product to make any model we want when doing service

// import joi from "@hapi/joi";

// import Products from "./productDomainModel";

// const newProduct = (data) => {
//   // we can validate data with joi object (read  joi doc to know more about joi validation)
//   const product = joi.object({
//     name: joi.string().required(),
//     short_description: joi.string().required(),
//     long_description: joi.string(),
//     price: joi.number().required(),
//     thumbnail: joi.array(),
//     properties: joi.array(),
//     variations: joi.array(),
//     category: joi.string().required(),
//     storeId: joi.string().required(),
//     isPublished: joi.boolean(),
//     isVerified: joi.boolean(),
//   });

//   const newProduct = {
//     info: {},
//     errMessage: "",
//   };
//   const validationResult = product.validate(data);

//   if (validationResult.error) {
//     console.log(validationResult.error.details[0].message);
//     newAdmin.errMessage = validationResult.error.details[0].message;
//   } else {
//     newProduct.info = new Products(
//       data.fullName,
//       data.short_description,
//       data.long_description,
//       data.price,
//       data.thumbnail,
//       data.properties,
//       data.variations,
//       data.category,
//       data.storeId,
//       data.isPublished,
//       data.isVerified
//     );
//   }

//   return newProduct;
// };

// export { newProduct };
