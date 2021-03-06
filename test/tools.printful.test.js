import Joi from 'joi';
import { dataOrder, dataWebhook } from '../mock/testData.json';
import {
  rawProducts,
  webhooksSchema,
  contryCodesSchema,
} from '../validator/printfulSchema';
import Printful from '../lib/printful';




const printfulClient = new Printful('pau14igl-7xfe-7xs5:b8k3-fl7mwfotabjl');
const orderID = '';

test('get all raw products ', async () => {
const products = await printfulClient.getRawProducts();
const JoiValidation = rawProducts.validate(products);
expect(JoiValidation.error).toBe(undefined);


});
test('get all  products ', async () => {
const products = await printfulClient.getShopProductsSearch('101');
console.log(products);

  expect(products[0].id).toBe(211704237);
});
test('get raw products by searching 101', async () => {
const products = await printfulClient.getRawProductsSearch('101');

  expect(products[0].id).toBe(211704237);
});
test('get raw variants for product  211704237', async () => {
const products = await printfulClient.getRawProductVariants('211704237');

  expect(products[0].sync_product_id).toBe(211704237);
});

test('get order with the status draft', async () => {
const orders = await printfulClient.getAllOrderByStatus('draft');

  expect(orders.length).toBe(0);
});
test('estimate new order  for the product ', async () => {
const estimation = await printfulClient.estimateNewOrder(dataOrder);

expect(estimation.retail_costs.total).toBe(parseInt(dataOrder.items[0].retail_price));

});
test('create new order  for the product ', async () => {
const order = await printfulClient.createNewOrder(dataOrder);
orderID = order.id;
expect(order.status).toBe('draft');

});
test(`get order value ${orderID}`, async () => {
const order = await printfulClient.getOrder(orderID);

  expect(order.id).toBe(orderID);
});
test(`cancel  order value ${orderID}`, async () => {
const order = await printfulClient.cancelOrder(orderID);

  expect(order.id).toBe(orderID);
});

test("get contry/code ", async () => {
  const contryCodes = await printfulClient.getContryCode();
  const JoiValidation = contryCodesSchema.validate(contryCodes);
  expect(JoiValidation.error).toBe(undefined);
});
test("set webhooks endpoint", async () => {
  const newWebhooks = await printfulClient.setWebhook(dataWebhook);
  const JoiValidation = webhooksSchema.validate(newWebhooks);
  expect(JoiValidation.error).toBe(undefined);
});
test("get webhooks endpoint", async () => {
  const webhook = await printfulClient.getWebhook();
  const JoiValidation = webhooksSchema.validate(webhook);
  expect(JoiValidation.error).toBe(undefined);
});
test("delete  webhooks endpoint", async () => {
  const webhook = await printfulClient.deleteWebhook();
  const JoiValidation = webhooksSchema.validate(webhook);
  expect(JoiValidation.error).toBe(undefined);
});
