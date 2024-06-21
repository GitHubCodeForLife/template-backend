import mongoose from "mongoose";

const { Schema } = mongoose;

const productVariationShema = new Schema({
  variation_attributes: [
    {
      variation_name: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  sku: {
    type: String,
  },
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  images: [
    {
      type: String,
    },
  ],
});
const productSchema = new Schema(
  {
    name: {
      type: String,
    },
    thumbnails: {
      type: String,
    },
    description: {
      type: String,
    },
    properties: [
      {
        property_name: {
          type: String,
        },
        property_value: [
          {
            sub_property: {
              type: String,
            },
            value: {
              type: String,
            },
          },
        ],
      },
    ],
    variations: [
      {
        type: productVariationShema,
      },
    ],
    category_id: {
      type: Schema.Types.ObjectId,
    },
    discount_id: {
      type: Schema.Types.ObjectId,
    },
    store_id: {
      type: Schema.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "denied"],
      default: "pending",
    },
    is_published: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Product", productSchema);
