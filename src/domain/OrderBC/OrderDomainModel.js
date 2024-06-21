/* eslint-disable max-classes-per-file */
export class Order {
  constructor({
    total,
    items,
    userId,
    status,
    shipDate,
    shipperId,
    receiverName,
    receiverPhone,
    paymentDetailId,
    receiverAddress,
  }) {
    this.total = total;
    this.items = items;
    this.userId = userId;
    this.status = status;
    this.shipDate = shipDate;
    this.shipperId = shipperId;
    this.receiverName = receiverName;
    this.receiverPhone = receiverPhone;
    this.paymentDetailId = paymentDetailId;
    this.receiverAddress = receiverAddress;
  }
}

export class OrderItem {
  constructor({
    price,
    total,
    quantity,
    productId,
    discountId,
  }) {
    this.price = price;
    this.total = total;
    this.quantity = quantity;
    this.productId = productId;
    this.discountId = discountId;
  }
}
