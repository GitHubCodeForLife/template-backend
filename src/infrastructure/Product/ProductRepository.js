import autoBind from "auto-bind";

import ProductModel from "./ProductModel";
import BaseRepository from "../../../base/BaseRepository";

class ProductRepository extends BaseRepository {
  constructor() {
    super(ProductModel);
    autoBind(this);
  }

  async getAllProduct() {
    try {
      const allProducts = await this.model.find();
      return allProducts;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async insert(data) {
    try {
      // const newProduct = new ProductModel(data);
      const result = await this.model(data).save();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default ProductRepository;
