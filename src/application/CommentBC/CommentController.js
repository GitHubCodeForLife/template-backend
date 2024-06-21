import autoBind from "auto-bind";
import CommentService from "../../domain/CommentBC/CommentService";
import BaseController from "../../../base/BaseController";
import { getPage } from "../../../utils/Pagination";
import { grpcClientUser } from "../../../config/grpcClientConfig";

class CommentController extends BaseController {
  constructor() {
    super(CommentService);
    autoBind(this);
  }

  async getAll(req, res) {
    const reqPage = req.query.page;
    const page = getPage(reqPage);
    const limit = 10;
    const response = await this.service.getAll(page, limit);
    return res.status(response.status).json(response);
  }

  async insertComment(req, res) {
    const response = await this.service.insert(req.body);
    return res.status(response.status).json(response);
  }

  async findByProductId(req, res) {
    const { id } = req.params;
    const response = await this.service.findByProductId(id);
    return res.status(response.status).json(response);
  }

  async findByUserId(req, res) {
    const { id } = req.params;
    const response = await this.service.findByUserId(id);
    return res.status(response.status).json(response);
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

export default new CommentController();
