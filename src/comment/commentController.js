import CommentService from "./commentService.js";
import BaseController from "../../base/BaseController.js";
import autoBind from "auto-bind";

import * as validate from "./commentValidate.js";

const CommentSevice = new CommentService();

class CommentController extends BaseController {
  constructor() {
    super(CommentSevice);
    autoBind(this);
  }
  async getAll(req, res, next) {
    try {
      const result = await this.service.getAllCommentsByProductId(req.params.productId);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
  async insert(req, res, next) {
    try {
      const data = { ...req.body };
      const validated = validate.validateCreateComment(data);
      if (validated.error != null)
        return res.status(400).send(validated.error.details[0].message);
  
      const response = await this.service.insertComment(data);
      return res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }
}
export default new CommentController();