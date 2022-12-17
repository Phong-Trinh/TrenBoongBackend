module.exports = {
  async afterCreate(event) {
    const { result, params } = event;

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
  },
};
