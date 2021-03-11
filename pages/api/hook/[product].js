import Printful from '@Lib/printful';

const printfulClient = new Printful(process.env.NEXT_PRINTFUL_APIKEY);
export default async function handler(req, res) {
  const { product } = req.query;
  console.log('HERE ', product);
  const products = await printfulClient.getRawProducts();
  console.log(products);
  res.status(200);
}
