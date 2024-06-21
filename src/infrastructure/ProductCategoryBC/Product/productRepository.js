import autoBind from "auto-bind";
import mongoose from "mongoose";
import isEqual from "lodash/isEqual";

// eslint-disable-next-line no-unused-vars
import DiscountModel from "../../StoreBC/Discount/discount.model";
import ProductModel from "./productModel";
import BaseRepository from "../../../../base/BaseRepository";
import Category from "../Category/CategoryModel";
import CategoryRepository from "../Category/CategoryRepository";
// eslint-disable-next-line no-unused-vars
// import StoreModel from "../../StoreBC/Store/store.model";

const { Types } = mongoose;

const categoryRepository = new CategoryRepository();

class ProductRepository extends BaseRepository {
  constructor() {
    super(ProductModel);
    autoBind(this);
  }

  async get(id) {
    try {
      const product = await this.model
        .findById(id)
        .populate([
          {
            path: "store_id",
            model: "Store",
            select: ["store_name", "store_image"],
          },
          {
            path: "discount_id",
            model: "Discount",
            select: ["name", "description", "discount_percent"],
          },
        ])
        .exec();
      const category = await Category.aggregate([
        { $match: { _id: Types.ObjectId(product.category_id) } },
        {
          $graphLookup: {
            from: "categories",
            startWith: "$ancestor_category",
            connectFromField: "ancestor_category",
            connectToField: "_id",
            as: "ancestor",
          },
        },
        {
          $project: {
            category_name: 1,
            ancestor: "$ancestor.category_name",
          },
        },
      ]).exec();

      let concatenateCatagory = category[0].category_name;
      category[0].ancestor.forEach((element) => {
        concatenateCatagory = `${element} > ${concatenateCatagory}`;
      });

      return {
        isSuccess: true,
        data: { ...product.toJSON(), category: concatenateCatagory },
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting product information!",
      };
    }
  }

  async getPendingProducts() {
    try {
      const productList = await this.model
        .find({ status: "pending" })
        .select({ variations: 0, properties: 0 })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "store_id",
            model: "Store",
            select: ["store_name", "store_image"],
          },
        ])
        .exec();
      return { isSuccess: true, data: productList };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting pending products!",
      };
    }
  }

  async searchByKeyword(keyword) {
    try {
      const product = await this.model
        .aggregate([
          { $match: { name: { $regex: keyword, $options: "i" } } },
          { $sample: { size: 4 } },
        ])
        .exec();
      return { isSuccess: true, data: product };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error: error.message || "Some error occurred while searching products!",
      };
    }
  }

  async getRecommendProduct(keyword) {
    try {
      const product = await this.model
        .find({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            {
              "properties.property_value.value": {
                $regex: keyword,
                $options: "i",
              },
            },
          ],
        })
        .limit(3)
        .populate([
          {
            path: "store_id",
            model: "Store",
            select: ["store_name", "store_image"],
          },
        ])
        .exec();
      return { isSuccess: true, data: product };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting recommended products!",
      };
    }
  }

  async getRecentVariations(categoryId) {
    try {
      const variationsArr = await categoryRepository.getVariations(categoryId);
      const recentVariations = {};

      variationsArr.variations.product_variations.forEach((variation) => {
        recentVariations[variation] = {
          variationName: variation,
          options: [],
        };
        return null;
      });

      const products = await this.model.aggregate([
        {
          $match: {
            category_id: Types.ObjectId(categoryId),
          },
        },
        {
          $project: {
            variations: "$variations.variation_attributes",
          },
        },
        {
          $limit: 15,
        },
      ]);

      // Need to optimize
      products.forEach((product) => {
        product.variations.forEach((options) => {
          options.forEach((option) => {
            variationsArr.variations.product_variations.forEach(
              (variationName) => {
                if (
                  option.variation_name === variationName
                  && recentVariations[variationName].options.every(
                    (e) => !isEqual(e, {
                      label: option.value,
                      value: option.value,
                    }),
                  )
                ) {
                  recentVariations[variationName].options = [
                    ...recentVariations[variationName].options,
                    {
                      label: option.value,
                      value: option.value,
                    },
                  ];
                }
                return null;
              },
            );
          });
        });
      });

      return {
        isSuccess: true,
        recentVariations,
        message: "Get recent variations successfully!",
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting recent variations!",
      };
    }
  }

  async getAllGroupByCategory(page, limit, listCategory) {
    const data = {};
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const category of listCategory) {
        const products = await this.model.find({ category_id: category._id })
          .select({ variations: 0, properties: 0 })
          .sort({ createdAt: -1 })
          .populate([
            {
              path: "store_id",
              model: "Store",
              select: ["store_name", "store_image"],
            },
            {
              path: "discount_id",
              model: "Discount",
              select: ["name", "description", "discount_percent"],
            },
          ])
          .skip(page * limit)
          .limit(limit)
          .exec();

        data[category.category_name] = products;
      }
      return { isSuccess: true, data };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting product information!",
      };
    }
  }
}

export default ProductRepository;
