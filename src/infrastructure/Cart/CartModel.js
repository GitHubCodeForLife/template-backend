import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    user_id: {
      type: Number,
    },
    items: [
      {
        product_id: {
          type: Schema.Types.ObjectId,
        },
        product_variation_id: {
          type: Schema.Types.ObjectId,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Cart", cartSchema);
