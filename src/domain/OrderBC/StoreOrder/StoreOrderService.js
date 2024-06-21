/* eslint-disable max-len */
// Handle business
import autoBind from "auto-bind";

import BaseService from "../../../../base/BaseService";
import StoreOrderRepository from "../../../infrastructure/OrderBC/StoreOrder/StoreOrderRepository";
import HttpError from "../../../utils/HttpError";
import HttpResponse from "../../../utils/HttpResponse";

const storeOrderRepository = new StoreOrderRepository();

class StoreOrderService extends BaseService {
  constructor() {
    super(storeOrderRepository);
    autoBind(this);
  }

  async getPendingOrders(storeOwnerId) {
    const result = await this.repository.getPendingOrders(storeOwnerId);
    if (!result.isSuccess) return new HttpError(result.error);

    return new HttpResponse(result.data);
  }
}

export default new StoreOrderService();
