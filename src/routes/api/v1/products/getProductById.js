const Models = require('../../../../../models/');

const queryResultDecomposer = queryResult => ({
  productID: queryResult.productID,
  price: queryResult.price,
  name: queryResult.name,
  description: queryResult.description,
  manufacturer: queryResult.manufacturer,
  model: queryResult.model,
  category: queryResult.category,
  image: queryResult.image,
  upc: queryResult.upc,
});

module.exports = redisClient => [
  {
    method: 'GET',
    path: '/api/v1/products/{productId}',
    config: {
      auth: false,
    },
    handler: (request, response) => {
      redisClient.hget('productId', request.params.productId, (error, value) => {
        if (error || value === null || value === undefined) {
          Models.ProductDetails.findAll({
            where: {
              productID: request.params.productId,
            },
          }).then((queryResult) => {
            if (queryResult.length === 0) {
              response({
                statusCode: 404,
                error: 'Product not found',
              });
            }
            response({
              statusCode: 200,
              data: queryResultDecomposer(queryResult[0]),
            });
          }).catch((queryError) => {
            response({
              statusCode: 404,
              error: 'Error',
            });
          });
        } else {
          console.log('Served from cache');
          response({
            statusCode: 200,
            data: queryResultDecomposer(JSON.parse(value)),
          });
        }
      });
    },
  },
];
