import orderStatus from "./OrderStatusValueObj";

const createOrder = (data) => {
  const newOrder = {
    info: {},
    errMessage: "",
  };

  // const itemList = items && items.forEach((item) => createItem(item));

  newOrder.info = {
    total: data.total,
    userId: data.userId,
    shipDate: data.shipDate,
    shipperId: data.shipperId,
    receiverName: data.receiver_name,
    receiverPhone: data.receiver_phone,
    // items: itemList,
    paymentmethod: data.paymentmethod,
    receiverAddress: data.receiver_address,
    status: orderStatus.PROCESSING,
  };

  return newOrder;
};

export default createOrder;
