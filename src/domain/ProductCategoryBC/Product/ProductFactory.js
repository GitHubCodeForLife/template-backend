import mongoose from "mongoose";

import CategoryRepository
  from "../../../infrastructure/ProductCategoryBC/Category/CategoryRepository";
import Product from "./ProductDomainModel";
import SaveHelper from "../../../../helper/file/FileSaveHelper";

const saveHelper = new SaveHelper();
const categoryRepository = new CategoryRepository();

const createProduct = async (
  name,
  thumbnail,
  description,
  properties,
  type,
  variations,
  categoryId,
  discountId,
  storeId,
) => {
  try {
    const savedThumbnail = await saveHelper.saveImage(thumbnail);

    const categoryRes = (await categoryRepository.get(categoryId)).data;

    const tmpProperties = Object.entries(properties).map((prop, index) => ({
      property_name: categoryRes.properties[index].name,
      _id: mongoose.Types.ObjectId(prop[0]),
      property_value: prop[1].map((subProp, index2) => ({
        _id: new mongoose.Types.ObjectId(),
        sub_property: categoryRes.properties[index].sub_properties[index2],
        value: subProp[categoryRes.properties[index].sub_properties[index2]],
      })),
    }));
    let tmpVariations = [];

    if (type === "0") {
      tmpVariations = [{ ...variations[0] }];
      tmpVariations[0].images = await Promise.all(
        variations[0].images.map(async (images) => {
          const detailImg = await saveHelper.saveImage(images);
          return detailImg.url;
        }),
      );
    } else {
      tmpVariations = await Promise.all(
        variations.map(async (variation) => {
          const imageUrls = await Promise.all(
            variation.images.map(async (img) => {
              const detailImg = await saveHelper.saveImage(img);
              return detailImg.url;
            }),
          );

          const attributes = variation.variation_attributes.map((attr) => ({
            ...attr,
            _id: new mongoose.Types.ObjectId(),
          }));

          return {
            ...variation,
            images: imageUrls,
            variation_attributes: attributes,
          };
        }),
      );
    }

    const newProduct = new Product({
      name,
      thumbnails: savedThumbnail.url,
      description,
      properties: tmpProperties,
      categoryId: mongoose.Types.ObjectId(categoryId),
      discountId: mongoose.Types.ObjectId(discountId),
      storeId: mongoose.Types.ObjectId(storeId),
      isPublished: false,
      status: "pending",
      variations: tmpVariations,
    });
    // console.log(newProduct);
    return newProduct;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default createProduct;
