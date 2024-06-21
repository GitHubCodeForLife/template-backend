import autoBind from "auto-bind";

// eslint-disable-next-line no-unused-vars
import DiscountModel from "../../StoreBC/Discount/discount.model";
import StoreOrderModel from "./StoreOrderModel";
import BaseRepository from "../../../../base/BaseRepository";
import Store from "../../StoreBC/Store/storeModel";

// eslint-disable-next-line no-unused-vars
// import StoreModel from "../../StoreBC/Store/store.model";

// const { Types } = mongoose;

class StoreOrderRepository extends BaseRepository {
  constructor() {
    super(StoreOrderModel);
    autoBind(this);
  }

  async get(id) {
    try {
      const orderDetail = await this.model
        .findById(id)
        .populate([
          {
            path: "items.product_id",
            model: "Product",
            select: { properties: 0, description: 0 },
          },
          {
            path: "ancestor_order",
            model: "orders",
            select: [
              "ship_date",
              "receiver_address",
              "receiver_name",
              "receiver_phone",
            ],
          },
        ])
        .exec();
      return { isSuccess: true, data: orderDetail };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting product information!",
      };
    }
  }

  async getPendingOrders(storeOwnerId) {
    try {
      console.log(storeOwnerId);
      const foundStore = await Store.findOne({ store_owner_id: storeOwnerId });
      console.log({ foundStore });
      const orderList = await this.model
        .find({ store_id: foundStore._id, status: "pending" })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "items.product_id",
            model: "Product",
            select: { properties: 0, description: 0 },
          },
        ])
        .exec();
      console.log(orderList.items);
      return { isSuccess: true, data: orderList };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting pending products!",
      };
    }
  }
}

export default StoreOrderRepository;
