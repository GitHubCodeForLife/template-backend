// Handle business
import autoBind from "auto-bind";

// Utils
import HttpError from "../../../utils/HttpError";
import HttpResponse from "../../../utils/HttpResponse";
// Base service
import BaseService from "../../../../base/BaseService";

import CategoryRepository
  from "../../../infrastructure/ProductCategoryBC/Category/CategoryRepository";

const categoryRepository = new CategoryRepository();

class CategoryService extends BaseService {
  constructor() {
    super(categoryRepository);
    autoBind(this);
  }

  async getCategories() {
    const categories = await this.repository.getAll();

    if (categories.errMessage) {
      return new HttpError({
        statusCode: 400,
        message: categories.errMessage,
      });
    }

    return new HttpResponse(categories);
  }

  // async getSuggetedColors(categoryId) {

  // }
}

export default new CategoryService();
