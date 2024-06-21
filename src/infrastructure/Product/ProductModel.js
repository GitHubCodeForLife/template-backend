// phần này làm việc với monodb
import mongoose from "mongoose";

// thêm các thuộc tính trong schema này theo colection trong mongodb
// nếu trong quá trình phát triển phát sinh thêm thuộc tính mới
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    short_description: { type: String, unique: true, required: true },
    long_description: { type: String },
    price: { type: String },
    thumbnail: { type: Array },
    properties: { type: Array },
    variations: { type: Array },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "stores" },
    isPublished: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },

  },
  { timestamps: true },
);

const Product = mongoose.model("Products", productSchema);

export default Product;
