import autoBind from "auto-bind";
import Comment from "./commentModel";
import BaseSevice from "../../base/BaseService";
import HttpResponse from "../../helper/HttpResponse";

class CommentService extends BaseSevice {
  constructor() {
    super(Comment);
    autoBind(this);
  }

  async insertComment(data) {
    try {
      const item = await this.model.create(data);
      if (item) {
        return new HttpResponse(item, { statusCode: 201 });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCommentsByProductId(productId) {
    try {
      const allComments = await this.model.findAll({
        where: { productId },
      });
      return allComments;
    } catch (error) {
      console.error(error);
    }
  }
}

export default CommentService;
