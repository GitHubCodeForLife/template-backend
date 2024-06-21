import mongoose from "mongoose";

const { Schema, model } = mongoose;

const storeOrder = new Schema(
  {
    store_id: { type: Schema.Types.ObjectId },
    ancestor_order: { type: Schema.Types.ObjectId },
    customer_id: { type: Number },
    status: {
      type: String,
      enum: ["pending", "verified"],
    },
    items: [
      {
        product_id: { type: Schema.Types.ObjectId },
        product_variation_id: { type: Schema.Types.ObjectId },
        quantity: { type: Number },
        price: { type: Number },
        discount_id: { type: Schema.Types.ObjectId },
        total: { type: Number },
      },
    ],
  },
  { timestamps: true },
);

const StoreOrder = model("store_orders", storeOrder);
export default StoreOrder;
