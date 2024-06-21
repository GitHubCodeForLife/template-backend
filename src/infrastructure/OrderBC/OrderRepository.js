import autoBind from "auto-bind";

import OrderModel from "./OrderModel";
import BaseRepository from "../../../base/BaseRepository";

class OrderRepository extends BaseRepository {
  constructor() {
    super(OrderModel);
    autoBind(this);
  }
}

export default OrderRepository;
