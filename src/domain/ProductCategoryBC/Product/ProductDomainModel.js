export default class Product {
  constructor({
    id,
    name,
    thumbnails,
    description,
    properties,
    variations,
    categoryId,
    discountId,
    storeId,
    isPublished,
    createdAt,
    updatedAt,
    status,
  }) {
    this.id = id;
    this.name = name;
    this.thumbnails = thumbnails;
    this.description = description;
    this.properties = properties;
    this.variations = variations;
    this.categoryId = categoryId;
    this.discountId = discountId;
    this.storeId = storeId;
    this.isPublished = isPublished;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
  }
}
