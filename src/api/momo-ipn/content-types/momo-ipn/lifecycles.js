const axios = require('axios');

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;
    if (params.data.resultCode != 0) return;
    cardId = [];
    console.log(params.data.orderId);
    const order = await strapi.entityService.findOne('api::receipt.receipt', params.data.orderId, {
      fields: '*',
      populate: {receipt_details: {populate: {product: {populate: {card: true}}}}, app_user: {populate: {id: true}}},
    });
    var detailOrderCardId = order.receipt_details.filter((element) => element.product.type == 'card').map(e => e.product.card.id);
    var userId = order.app_user.id;
    detailOrderCardId.forEach((element) => {
    strapi.entityService.create('api::user-card.user-card', {
      data: {
        app_user: userId,
        card: element
      }});
    });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'key=AAAAFtj6z0g:APA91bHI8gLo5cjyDNmAp72ss0QOLOjYjCwJ2vWlx8VJ-Shb6ef8FQG54aJljmKxQEn9Z_lxM0vQmHh3P7R9N1voZDgv_WkLhAZdTzEwidYWxqUtcJ9NNPaNCSWSIfYmtBVd98HqaZDg'
    }
      const { data } = await axios.post('https://fcm.googleapis.com/fcm/send', {
        to : order.app_user.fcm,
          notification : {
              title: "Thanh toán thành công!",
              body: "Đơn hàng đã được thanh toán. Tìm hiểu thêm nhiều tính năng hữu ích khác của Tren Boong"
          }
      }, {
        headers: headers
      });

      console.log(data);
  },
};
