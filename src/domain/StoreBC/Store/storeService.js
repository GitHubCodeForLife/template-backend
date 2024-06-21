import autoBind from "auto-bind";
import BaseService from "../../../../base/BaseService";
import StoreRepository from "../../../infrastructure/StoreBC/Store/store.repository";
import HttpError from "../../../utils/HttpError";
import HttpResponse from "../../../utils/HttpResponse";

const storeRepository = new StoreRepository();

class StoreService extends BaseService {
  constructor() {
    super(storeRepository);
    autoBind(this);
  }

  async addStore(data) {
    // console.log({ data });
    const result = await this.repository.insert(data);
    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse(result.data);
  }

  async updateStore(id, data) {
    const result = await this.repository.update(id, data);
    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse(result.data);
  }

  async getStore(id) {
    const result = await this.repository.get(id);
    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse(result.data);
  }
}

export default new StoreService();
