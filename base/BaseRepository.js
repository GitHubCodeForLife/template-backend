import autoBind from "auto-bind";

class BaseRepository {
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async create(modelName, data) {
    try {
      const obj = await this.model(data).save();

      return {
        obj,
        isSuccess: true,
        message: `Register new ${modelName} successfully!`,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error: error.message || `Some error occurred while creating ${modelName}!`,
      };
    }
  }

  async update(id, data) {
    try {
      const updatedProduct = await this.model.findByIdAndUpdate(
        id,
        {
          $set: data,
        },
        { new: true },
      );

      return {
        data: updatedProduct.toJSON(),
        isSuccess: true,
        message: `Update ${this.model.modelName} successfully!`,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || `Some error occurred while updating ${this.model.modelName}!`,
      };
    }
  }

  async get(id) {
    try {
      const result = await this.model.findById(id);
      return {
        data: result.toJSON(),
        isSuccess: true,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || `Some error occurred while getting ${this.model.modelName} information!`,
      };
    }
  }
}

export default BaseRepository;
