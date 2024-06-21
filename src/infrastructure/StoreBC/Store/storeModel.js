import mongoose from "mongoose";

const { Schema } = mongoose;

const storeSchema = new Schema(
  {
    store_name: {
      type: String,
    },
    store_image: {
      type: String,
    },
    store_owner_id: {
      type: Number,
    },
    warehouses: [
      {
        warehouse_name: {
          type: String,
        },
        address: {
          type: String,
        },
        manager_name: {
          type: String,
        },
        manager_phone: {
          type: String,
        },
        manager_email: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Store = mongoose.model("Store", storeSchema);

export default Store;
