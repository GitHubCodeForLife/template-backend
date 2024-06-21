import autoBind from "auto-bind";

import CommentModel from "./CommentModel";
import BaseRepository from "../../../base/BaseRepository";

class CommentRepository extends BaseRepository {
  constructor() {
    super(CommentModel);
    autoBind(this);
  }

  async getAll(page, limit) {
    try {
      const allComments = await this.model.find({}, {}, { skip: (page) * limit, limit }).populate(
        [
          {
            path: "product_id",
            model: "Product",
            select: ["name", "thumbnails"],
          },
          {
            path: "ancestor_comment",
            model: "Comment",
            select: ["content", "user_id"],
          },
        ],
      ).exec();
      if (allComments.length === 0) {
        return { isSuccess: false, message: "No comment found" };
      }
      return { isSuccess: true, data: allComments };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, message: error.message };
    }
  }

  async findById(id) {
    try {
      const result = await this.model.findById(id).populate(
        [
          {
            path: "product_id",
            model: "Product",
            select: ["name", "thumbnails"],
          },
          {
            path: "ancestor_comment",
            model: "Comment",
            select: ["content", "user_id"],
          },
        ],
      ).exec();
      if (!result) {
        return { isSuccess: false, message: "No comment found" };
      }
      return { isSuccess: true, data: result };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, message: error.message };
    }
  }

  async insert(data) {
    try {
      const result = await this.model.create(data);
      return { isSuccess: true, data: result };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, message: error.message };
    }
  }

  async findByProductId(productId) {
    try {
      const result = await this.model.find({ product_id: productId }).populate(
        [
          {
            path: "product_id",
            model: "Product",
            select: ["name", "thumbnails"],
          },
          {
            path: "ancestor_comment",
            model: "Comment",
            select: ["content", "user_id"],
          },
        ],
      ).exec();
      if (result.length === 0) {
        return { isSuccess: false, message: "No comment found" };
      }
      return { isSuccess: true, data: result };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findByUserId(id) {
    try {
      const result = await this.model.find({ user_id: id });

      if (result.length === 0) {
        return { isSuccess: false, message: "No comment found" };
      }
      return { isSuccess: true, data: result };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, message: error.message };
    }
  }

  async update(id, data) {
    try {
      const newComment = await this.model.findByIdAndUpdate(id, data);
      return { isSuccess: true, data: newComment };
    } catch (error) {
      console.error(error);
      return { isSuccess: false, message: error.message };
    }
  }
}

export default new CommentRepository();
