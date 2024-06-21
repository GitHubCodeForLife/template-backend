import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user_id: {
      type: Number,
    },
    product_id: {
      type: Schema.Types.ObjectId,
    },
    content: {
      type: String,
    },
    ancestor_comment: {
      type: Schema.Types.ObjectId,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Comment", commentSchema);
