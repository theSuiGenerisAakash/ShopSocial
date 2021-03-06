const Models = require('../../models/');

beforeEach(() => Models.OrderDetails.destroy({ truncate: true }));
afterEach(() => Models.OrderDetails.destroy({ truncate: true }));
afterAll(() => Models.close());

describe('Testing the OrderDetails table', () => {
  it('testing with sample valid order object with multiple users', (done) => {
    const sampleOrder = {
      orderID: 'OD1234',
      userIDs: ['user1', 'user2'],
      productIDs: [123, 456],
      productPrices: [1.23, 4.56],
      orderStatus: 'ONGOING',
    };

    Models.OrderDetails.create(sampleOrder).then(() => {
      Models.OrderDetails.find().then((result) => {
        expect(result.orderID).toBe(sampleOrder.orderID);
        expect(result.userIDs.sort()).toEqual(sampleOrder.userIDs.sort());
        expect(result.productIDs.sort()).toEqual(sampleOrder.productIDs.sort());
        expect(result.productPrices.sort()).toEqual(sampleOrder.productPrices.sort());
        expect(result.orderStatus).toBe(sampleOrder.orderStatus);
        done();
      });
    });
  });

  it('testing with sample valid order object with only user ', (done) => {
    const sampleOrder = {
      orderID: 'OD1234',
      userIDs: ['user1'],
      productIDs: [123, 456],
      productPrices: [1.23, 4.56],
      orderStatus: 'FULFILLED',
    };

    Models.OrderDetails.create(sampleOrder).then(() => {
      Models.OrderDetails.find().then((result) => {
        expect(result.orderID).toBe(sampleOrder.orderID);
        expect(result.userIDs.sort()).toEqual(sampleOrder.userIDs.sort());
        expect(result.productIDs.sort()).toEqual(sampleOrder.productIDs.sort());
        expect(result.productPrices.sort()).toEqual(sampleOrder.productPrices.sort());
        expect(result.orderStatus).toBe(sampleOrder.orderStatus);
        done();
      });
    });
  });
  it('testing with sample valid order object for orderStatus "CANCELLED" ', (done) => {
    const sampleOrder = {
      orderID: 'OD1234',
      userIDs: ['user1'],
      productIDs: [123, 456],
      productPrices: [1.23, 4.56],
      orderStatus: 'CANCELLED',
    };

    Models.OrderDetails.create(sampleOrder).then(() => {
      Models.OrderDetails.find().then((result) => {
        expect(result.orderID).toBe(sampleOrder.orderID);
        expect(result.userIDs.sort()).toEqual(sampleOrder.userIDs.sort());
        expect(result.productIDs.sort()).toEqual(sampleOrder.productIDs.sort());
        expect(result.productPrices.sort()).toEqual(sampleOrder.productPrices.sort());
        expect(result.orderStatus).toBe(sampleOrder.orderStatus);
        done();
      });
    });
  });

  it('testing with 2 sample valid order objects', (done) => {
    const sampleOrder = {
      orderID: 'OD1234',
      userIDs: ['user1'],
      productIDs: [123, 456],
      productPrices: [1.23, 4.56],
      orderStatus: 'CANCELLED',
    };

    const sampleOrder2 = {
      orderID: 'OD5678',
      userIDs: ['user1', 'user2'],
      productIDs: [123, 456],
      productPrices: [1.23, 4.56],
      orderStatus: 'ONGOING',
    };
    Models.OrderDetails.bulkCreate([sampleOrder, sampleOrder2]).then(() => {
      Models.OrderDetails.findAll({ attributes: ['orderID'] }).then((result) => {
        expect(result.sort().map(a => a.orderID)).toEqual(['OD1234', 'OD5678'].sort());
        done();
      });
    });
  });
});
