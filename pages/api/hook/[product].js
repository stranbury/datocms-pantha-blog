import Printful from '@Lib/printful';
import { variants } from 'tailwind.config';


import Util from 'util';

const setTimeoutPromise = Util.promisify(setTimeout);

const printfulClient = new Printful(process.env.NEXT_PRINTFUL_APIKEY);
export default  async function handler(req, res) {
  const { product } = req.query;
// console.log('product status : ', product);

const products = await printfulClient.getShopProducts();
setTimeoutPromise(300000, products).then((value) => {
  console.log('timeout in log :');
  console.log(value);
});

// console.log(products[0]);
// for (const v of products[0].variants) {
//   console.log('V value =>', v);
// }


return res.status(200).json({ data: true });

}
