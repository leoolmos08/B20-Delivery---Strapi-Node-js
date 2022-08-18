'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        const { burgers, idUser, addressShipping } = ctx.request.body;
        let totalPayment = 0;
        burgers.forEach((product) => {
          totalPayment += product.price ;
        });
        let name = addressShipping.name_lastname;
        let address = addressShipping.address;
        let phone = addressShipping.phone;
        const createOrder = [];
          const data = {
            user: idUser,
            name: name,
            address: address,
            phone: phone,
            product: burgers,
            totalPayment: totalPayment,
          };
    
          const validData = await strapi.entityValidator.validateEntityCreation(
            strapi.models.order,
            data
          );
          const entry = await strapi.query("order").create(validData);
          createOrder.push(entry);
        
    
        return createOrder;
      },
};
