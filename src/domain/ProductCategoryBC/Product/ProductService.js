/* eslint-disable max-len */
// Handle business
import autoBind from "auto-bind";
import convertCamelCaseToSnakeCaseObj from "../../../utils/format";

import BaseService from "../../../../base/BaseService";
import ProductRepository from "../../../infrastructure/ProductCategoryBC/Product/productRepository";
import HttpError from "../../../utils/HttpError";
import HttpResponse from "../../../utils/HttpResponse";
import CategoryRepository from "../../../infrastructure/ProductCategoryBC/Category/CategoryRepository";

import createProductFac from "./ProductFactory";

const productRepository = new ProductRepository();

const categoryRepository = new CategoryRepository();

class ProductService extends BaseService {
  constructor() {
    super(productRepository);
    autoBind(this);
  }

  async getPendingProducts() {
    const result = await this.repository.getPendingProducts();
    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse(result.data);
  }

  async searchByKeyword(keyword) {
    const result = await this.repository.searchByKeyword(keyword);
    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse(result.data);
  }

  async getRecommendProduct(keyword) {
    const result = await this.repository.getRecommendProduct(keyword);
    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse(result.data);
  }

  async getRecentVariations(categoryId) {
    const result = await this.repository.getRecentVariations(categoryId);
    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse(result);
  }

  async createProduct(data) {
    const newProduct = await createProductFac(
      data.name,
      data.thumbnail[0],
      data.desc,
      data.properties,
      data.type,
      data.variations,
      data.category,
      data.discountId,
      data.storeId,
    );

    const result = await this.repository.create(
      "product",
      convertCamelCaseToSnakeCaseObj(newProduct),
    );
    if (!result.isSuccess) return new HttpError(result.error);
    return new HttpResponse(result);
  }

  // get list product
  async getAll(page, limit) {
    const categories = await categoryRepository.getListOfCateGory();
    if (!categories.isSuccess) return new HttpError(categories.error);
    const listCategory = categories.data;
    const result = await this.repository.getAllGroupByCategory(page, limit, listCategory);
    // if (!result.isSuccess) return new HttpError(result.error);
    return new HttpResponse(result);
  }
}

export default new ProductService();
