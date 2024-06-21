import autoBind from "auto-bind";
import CartModel from "./CartModel";
import BaseRepository from "../../../base/BaseRepository";

class CartRepository extends BaseRepository {
  constructor() {
    super(CartModel);
    autoBind(this);
  }

  async get(id) {
    try {
      const idid = "_id";
      const cart = await this.model
        .findById(id)
        .populate([
          {
            path: "items.product_id",
            model: "Product",
            select: ["name", "variations"],
          },
        ]).lean();
      const items = cart.items.map((x) => {
        const variat = x.product_variation_id;
        const aaa = x.product_id.variations.find((t) => t[idid].toString() === variat.toString());
        const temp = { ...x, variation: aaa };
        return temp;
      });
      const response = { ...cart, items };

      return {
        isSuccess: true,
        data: { ...response },
      };
    } catch (error) {
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting Cart information!",
      };
    }
  }

  async getUserId(userId) {
    try {
      const cart = await this.model
        .find({ user_id: userId });
      return {
        isSuccess: true,
        data: { ...cart },
      };
    } catch (error) {
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting Cart information!",
      };
    }
  }

  async addToCart(userId, productId, quantity, productVariationId) {
    try {
      const cart = await this.model
        .findOne({ user_id: userId });
      if (!cart) {
        const newCart = new CartModel({
          user_id: userId,
          items: [
            {
              product_id: productId,
              quantity,
              product_variation_id: productVariationId,
            },
          ],
        });
        const result = await newCart.save();
        return {
          isSuccess: true,
          data: result,
        };
      }
      cart.items.push({
        product_id: productId,
        quantity,
        product_variation_id: productVariationId,
      });

      const result = await cart.save();
      return {
        isSuccess: true,
        data: result,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while adding to Cart!",
      };
    }
  }

  // gọi khi user checkout thành công
  async restartCart(userId) {
    try {
      const cart = await this.model
        .findOne({ user_id: userId });
      cart.items = [];
      const result = await cart.save();
      return {
        isSuccess: true,
        data: result,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while adding to Cart!",
      };
    }
  }
}

export default CartRepository;
