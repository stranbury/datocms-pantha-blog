import Printful from '@Lib/printful';

const printfulClient = new Printful(process.env.NEXT_PRINTFUL_APIKEY);
export default  async function handler(req, res) {
  const { product } = req.query;
console.log('product status : ', product);

const products = await printfulClient.getShopProducts();

console.log(products[0]);
console.log(products[0].variants);
return res.status(200).json({ data: true });

}
