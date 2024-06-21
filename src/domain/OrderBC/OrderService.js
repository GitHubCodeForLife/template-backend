// Handle business
import autoBind from "auto-bind";

// Utils
import HttpError from "../../utils/HttpError";
import HttpResponse from "../../utils/HttpResponse";
// Base service
import BaseService from "../../../base/BaseService";
import createOrder from "./OrderFactory";
import OrderRepository from "../../infrastructure/OrderBC/OrderRepository";
import ProductRepository from "../../infrastructure/ProductCategoryBC/Product/productRepository";
import StoreOrder from "../../infrastructure/OrderBC/StoreOrder/StoreOrderModel";

const orderRepository = new OrderRepository();
const productRepository = new ProductRepository();

class OrderService extends BaseService {
  constructor() {
    super(orderRepository);
    autoBind(this);
  }

  async createAnOrder(data) {
    // Validate data and create object
    const newOrder = createOrder(data);

    if (newOrder.errMessage) {
      return new HttpError({
        statusCode: 400,
        message: newOrder.errMessage,
      });
    }

    // Create new order
    const result = await this.repository.create("order", newOrder.info);

    if (!result.isSuccess) {
      return new HttpError(result.message);
    }

    return new HttpResponse(result);
  }

  async createPaymentOrder(data) {
    const newOrder = createOrder(data);

    if (newOrder.errMessage) {
      return new HttpError({
        statusCode: 400,
        message: newOrder.errMessage,
      });
    }

    // Create new order
    const result = await this.repository.create("order", newOrder.info);

    const ancestor_order_id = result.obj._id;

    const { items } = data;
    const storeOrders = [];
    for (let i = 0; i < items.length; i++) {
      // console.log(items[i]);
      const item = items[i];
      // console.log(item.product_id);
      const product = await productRepository.get(item.product_id);
      // console.log({ product });
      const status = "pending";
      const store_id = product.data.store_id._id;
      // check if store_id is exist add to items
      const storeOrder = storeOrders.find(
        (storeOrder) => storeOrder.store_id === store_id,
      );
      if (storeOrder) {
        storeOrder.items.push(item);
      } else {
        // objectID to string

        storeOrders.push({
          store_id: store_id.toString(),
          ancestor_order: ancestor_order_id.toString(),
          status,
          items: [item],
        });
      }
    }
    // console.log(storeOrders);
    const resultStoreOrder = await StoreOrder.create(storeOrders);

    return {
      statusCode: 200,
      message: "success",
      data: resultStoreOrder,
    };
  }
}

export default new OrderService();
