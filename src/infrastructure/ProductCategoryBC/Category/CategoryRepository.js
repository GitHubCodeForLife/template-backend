import autoBind from "auto-bind";

import CategoryModel from "./CategoryModel";
import BaseRepository from "../../../../base/BaseRepository";

class CategoryRepository extends BaseRepository {
  constructor() {
    super(CategoryModel);
    autoBind(this);
  }

  async getAll() {
    try {
      const categories = await this.model.aggregate([
        {
          $match: {
            ancestor_category: null,
          },
        },
        {
          $graphLookup: {
            from: "categories",
            startWith: "$_id",
            connectFromField: "_id",
            connectToField: "ancestor_category",
            depthField: "level",
            as: "sub_categories",
          },
        },
        {
          $unwind: {
            path: "$sub_categories",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            "sub_categories.level": -1,
          },
        },
        {
          $group: {
            _id: "$_id",
            ancestor_category: {
              $first: "$ancestor_category",
            },
            icon: {
              $first: "$icon",
            },
            category_name: {
              $first: "$category_name",
            },
            properties: {
              $first: "$properties",
            },
            product_variations: {
              $first: "$product_variations",
            },
            sub_categories: {
              $push: "$sub_categories",
            },
          },
        },
        {
          $addFields: {
            sub_categories: {
              $reduce: {
                input: "$sub_categories",
                initialValue: {
                  level: -1,
                  presentChild: [],
                  prevChild: [],
                },
                in: {
                  $let: {
                    vars: {
                      prev: {
                        $cond: [
                          {
                            $eq: ["$$value.level", "$$this.level"],
                          },
                          "$$value.prevChild",
                          "$$value.presentChild",
                        ],
                      },
                      current: {
                        $cond: [
                          {
                            $eq: ["$$value.level", "$$this.level"],
                          },
                          "$$value.presentChild",
                          [],
                        ],
                      },
                    },
                    in: {
                      level: "$$this.level",
                      prevChild: "$$prev",
                      presentChild: {
                        $concatArrays: [
                          "$$current",
                          [
                            {
                              $mergeObjects: [
                                "$$this",
                                {
                                  sub_categories: {
                                    $filter: {
                                      input: "$$prev",
                                      as: "e",
                                      cond: {
                                        $eq: [
                                          "$$e.ancestor_category",
                                          "$$this._id",
                                        ],
                                      },
                                    },
                                  },
                                },
                              ],
                            },
                          ],
                        ],
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          $addFields: {
            sub_categories: "$sub_categories.presentChild",
          },
        },
      ]);

      return {
        categories,
        isSuccess: true,
        message: `Get ${this.model.modelName} successfully!`,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || `Some error occurred while getting ${this.model.modelName} information!`,
      };
    }
  }

  async getVariations(categoryId) {
    try {
      const variations = await this.model.findById(categoryId, "product_variations");
      return {
        variations,
        isSuccess: true,
        message: `Get ${this.model.modelName} successfully!`,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting product variations!",
      };
    }
  }

  async getListOfCateGory() {
    try {
      const categories = await this.model.find({}).select("_id, category_name");
      return { isSuccess: true, data: categories };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        error:
          error.message
          || "Some error occurred while getting product variations!",
      };
    }
  }
}

export default CategoryRepository;
