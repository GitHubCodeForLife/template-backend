export default class Category {
  constructor({
    icon,
    createdAt,
    updatedAt,
    properties,
    categoryName,
    ancestorCategory,
    productVariations,
  }) {
    this.icon = icon;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.properties = properties;
    this.categoryName = categoryName;
    this.ancestorCategory = ancestorCategory;
    this.productVariations = productVariations;
  }
}
