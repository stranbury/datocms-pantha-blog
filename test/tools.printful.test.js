import Printful from '../lib/printful';

import { dataOrder, dataWebhook } from '../mock/testData.json';
import {
  rawProducts,
  products,
  webhooksSchema,
  estimationOrder,
  orders,
  orderSchema, 
  contryCodesSchema,
} from '../validator/printfulSchema';


const printfulClient = new Printful('pau14igl-7xfe-7xs5:b8k3-fl7mwfotabjl');
let orderID = '';


test('get all raw products ', async () => {
const rawProductsToTest = await printfulClient.getRawProducts();
const JoiValidation = rawProducts.validate(rawProductsToTest);

expect(JoiValidation.error).toBe(undefined);

});

test('get all  products ', async () => {
const productsToTest = await printfulClient.getShopProductsSearch('101');

const JoiValidation = products.validate(productsToTest);
expect(JoiValidation.error).toBe(undefined);

});

test('get raw products by searching 101', async () => {
const rawProductsToTest = await printfulClient.getRawProductsSearch('101');
const JoiValidation = rawProducts.validate(rawProductsToTest);

expect(JoiValidation.error).toBe(undefined);

});

test('get raw variants for product  211704237', async () => {
const productsToTest = await printfulClient.getRawProductVariants('211704237');
expect(productsToTest[0].sync_product_id).toBe(211704237);

});

test('estimate new order  for the product ', async () => {
const estimationToTest = await printfulClient.estimateNewOrder(dataOrder);
const joiValidation = estimationOrder.validate(estimationToTest);
expect(joiValidation.error).toBe(undefined);

});

test('create new order  for the product ', async () => {
const order = await printfulClient.createNewOrder(dataOrder);
orderID = order.id;
const JoiValidation = orderSchema.validate(order);
expect(JoiValidation.error).toBe(undefined);
expect(order.status).toBe('draft');

});

test('get order with the status draft', async () => {
  const ordersToTest = await printfulClient.getAllOrderByStatus('draft');
  console.log(ordersToTest);
  const JoiValidation = orders.validate(ordersToTest);
  expect(JoiValidation.error).toBe(undefined);
});

test(`get order value ${orderID}`, async () => {
  console.log('Identifiant :', orderID)
const order = await printfulClient.getOrder(orderID);
const JoiValidation = orderSchema.validate(order);
expect(JoiValidation.error).toBe(undefined);

  expect(order.id).toBe(orderID);
});

test(`cancel  order value ${orderID}`, async () => {
const order = await printfulClient.cancelOrder(orderID);
const JoiValidation = orderSchema.validate(order);
expect(JoiValidation.error).toBe(undefined);

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

