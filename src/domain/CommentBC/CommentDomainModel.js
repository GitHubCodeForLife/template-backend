export default class CommentDomainModel {
  constructor(userId, productId, content, ancestorComment, rating) {
    this.user_id = userId;
    this.product_id = productId;
    this.rating = rating;
    this.content = content;
    this.ancestorComment = ancestorComment;
  }
}
