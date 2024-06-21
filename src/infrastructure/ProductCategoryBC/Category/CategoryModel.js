import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
    },
    icon: {
      type: String,
    },
    ancestorCategory: {
      type: Schema.Types.ObjectId,
    },
    properties: [
      {
        name: {
          type: String,
        },
        sub_properties: [
          {
            type: String,
          },
        ],
      },
    ],
    product_variations: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("Category", categorySchema);
