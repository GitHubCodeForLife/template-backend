import autoBind from "auto-bind";

import Store from "./storeModel";

import BaseRepository from "../../../../base/BaseRepository";

class StoreRepository extends BaseRepository {
  constructor() {
    super(Store);
    autoBind(this);
  }

  async insert(data) {
    try {
      const result = await this.model(data).save();
      return {
        isSuccess: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data);
      return {
        isSuccess: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async delete(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return {
        isSuccess: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error,
      };
    }
  }

  async getStore(id) {
    try {
      const result = await this.model.findById(id);
      return {
        isSuccess: true,
        data: result,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error,
      };
    }
  }
}

export default StoreRepository;
