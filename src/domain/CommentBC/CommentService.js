import autoBind from "auto-bind";
import BaseService from "../../../base/BaseService";
import { comment } from "./CommentFactory";
import commentRepository from "../../infrastructure/CommentBC/CommentRepository";
import HttpError from "../../utils/HttpError";
import HttpResponse from "../../utils/HttpResponse";
import { grpcClientUser } from "../../../config/grpcClientConfig";

class CommentService extends BaseService {
  constructor() {
    super(commentRepository);
    autoBind(this);
  }

  async getAll(page, limit) {
    const result = await this.repository.getAll(page, limit);
    if (!result.isSuccess) {
      return new HttpError(result.message);
    }
    return new HttpResponse(result.data);
  }

  async insert(data) {
    try {
      const newComment = comment(data);
      if (newComment.errMessage) {
        return new HttpError(newComment.errMessage);
      }
      const result = await this.repository.insert(newComment.info);
      if (!result.isSuccess) {
        return new HttpError(result.message);
      }
      return new HttpResponse(result.data);
    } catch (error) {
      console.error(error);
      return new HttpError(error);
    }
  }

  async findByProductId(id) {
    try {
      const result = await this.repository.findByProductId(id);
      if (!result.isSuccess) {
        return new HttpError(result.message);
      }
      return new HttpResponse(result.data);
    } catch (error) {
      console.error(error);
      return new HttpError(error.message);
    }
  }

  async findByUserId(id) {
    try {
      const result = await this.repository.findByUserId(id);
      if (!result.isSuccess) {
        return new HttpError(result.message);
      }
      return new HttpResponse(result.data);
    } catch (error) {
      console.error(error);
      return new HttpError(error.message);
    }
  }

  async findUserIDofComment(commentId) {
    const result = await this.repository.findById(commentId);
    if (result) {
      return result.user_id;
    }
    return false;
  }

  async update(id, data) {
    const updateComment = comment(data);
    // validate failed
    if (updateComment.errMessage) {
      return new HttpError(updateComment.errMessage);
    }

    // update
    const result = await this.repository.update(id, updateComment.info);
    if (!result.isSuccess) {
      return new HttpError(result.message);
    }
    return new HttpResponse(result.data);
  }

  async findById(id) {
    const result = await this.repository.findById(id);
    if (!result.isSuccess) {
      return new HttpError(result.message);
    }
    return new HttpResponse(result.data);
  }

  async findOwnerInfoByCommentId(req, res) {
    const { id } = req.params;
    const userId = await this.service.findUserIDofComment(id);
    if (!userId) {
      return res.status(500).json({
        status: 500,
        data: null,
        message: "No user found",
      });
    }
    grpcClientUser.get({ id: userId }, (err, owner) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          data: null,
          message: "Internal Server Error",
        });
      }

      return res.status(200).json({
        status: 200,
        data: owner,
        message: "Owner info found",
      });
    });
  }
}

export default new CommentService();
