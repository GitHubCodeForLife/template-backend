import mongoose from "mongoose";

const { Schema } = mongoose;

const discountSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    discount_percent: {
      type: Number,
    },
    is_active: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Discount", discountSchema);
