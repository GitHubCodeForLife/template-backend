import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orders = new Schema(
  {
    user_id: {
      type: Number,
    },
    total: {
      type: Number,
    },
    payment_detail_id: {
      type: Number,
    },
    shipper_id: {
      type: Schema.Types.ObjectId,
    },
    ship_date: {
      type: Date,
    },
    receiver_address: {
      type: String,
    },
    receiver_name: {
      type: String,
    },
    receiver_phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "verified", "shipped", "cancelled", "Processing"],
    },
    items: [
      {
        product_id: { type: Schema.Types.ObjectId },
        product_variation_id: {
          type: Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
        discount_id: {
          type: Schema.Types.ObjectId,
        },
        total: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true },
);

const Orders = model("orders", orders);
export default Orders;
