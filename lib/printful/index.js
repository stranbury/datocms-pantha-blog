import Base64 from 'js-base64';
import color from 'color-name-list';
import { webhooksSchema, orderSchema } from '../../validator/printfulSchema';

import Fetcher from './fetcher';
export default class Printful {
  base_url = 'https://api.printful.com/';

  constructor(apikey) {
    this.fetcher = new Fetcher(this.base_url, Base64.encode(apikey));
  }

  stringProductDataToObject(productStringData) {
    const arrayData = productStringData.split('-');
    // Brand - brandDetail - capsule - name - categorie - sexe
    return {
      brand: arrayData[0],
      brandDetail: arrayData[1],
      capsule: arrayData[2],
      name: arrayData[3],
      categorie: arrayData[4],
      sexe: arrayData[5],
    };
  }

  stringVariantDataToObject(productStringData) {
    const arrayData = productStringData.split('-');
    // Brand - brandDetail - capsule - name - categorie - sexe - color - size
    return {
      brand: arrayData[0],
      brandDetail: arrayData[1],
      capsule: arrayData[2],
      name: arrayData[3],
      categorie: arrayData[4],
      sexe: arrayData[5],
      color: arrayData[6],//change to color Hex
      size: arrayData[7],
    };
  }

  async getRawProducts() {
    try {
      const { data } = await this.fetcher.get('store/products', {});
      if (data.code === 200) {
        return data.result;
      }
      throw data.error;
    } catch (error) {
      console.log('This error occured :', error, 'with search :', search);
      throw new Error("can't get product -sys- :", error);
    }
  }

  async getRawProductsSearch(search) {
    try {
      const { data } = await this.fetcher.get('store/products', {
        search,
      });
      if (data.code === 200) {
        return data.result;
      }
      throw data.error;
    } catch (error) {
      console.log('This error occured :', error, 'with search :', search);
      throw new Error("can't get product -sys- :", error);
    }
  }

  async getRawProductVariants(id) {
    try {
      const { data } = await this.fetcher.get(`store/products/${id}`);
      if (data.code === 200) {
        return data.result.sync_variants;
      }
      throw data.error;
    } catch (error) {
      console.log('This error occured :', error, 'with id :', id);
      return new Error("can't get product -sys- :", error);
    }
  }

  async getShopProductsSearch(search) {
    try {
      const rawProducts = await this.getRawProductsSearch(search);
      if (rawProducts) {
        const productsVariants = await Promise.all(
          rawProducts.map((raw) => this.getRawProductVariants(raw.id)),
        );
        const products = rawProducts.map((raw, index) => {
          const variants = productsVariants[index].map((rawVariants) => ({
            ...rawVariants,
            ...this.stringVariantDataToObject(rawVariants.name),
          }));
          return {
            ...raw,
            ...this.stringProductDataToObject(raw.name),
            variants,
          };
        });
        return products;
      }
    } catch (error) {
      console.log('This error occured :', error, 'with search :', search);
      return new Error("can't get product -sys- :", data.error);
    }
  }

  // Order
  async getAllOrderByStatus(status) {
    try {
      const { data } = await this.fetcher.get('orders', { status });

      if (data.code === 200) {
        return data.result;
      }
      throw data.error;
    } catch (error) {
      console.log('This error occured :', error, 'with status :', status);
      return new Error("can't get order -sys- :", error);
    }
  }

  async estimateNewOrder(order) {
    try {
      const checkOrder = orderSchema.validate(order);
      if (typeof checkOrder.error === 'undefined') {
        const { data } = await this.fetcher.post(
          'orders/estimate-costs',
          order
        );
        if (data.code === 200) {
          return data.result;
        }
      }
      throw new Error(checkOrder.error);
    } catch (error) {
      console.log('This error occured :', error, 'with status :', status);
      return new Error("can't get order -sys-error :", error);
    }
  }

async createNewOrder(order) {

    try {
      const checkOrder = orderSchema.validate(order);
    if (typeof checkOrder.error === 'undefined') {
      const { data } = await this.fetcher.post('orders', order);
      if (data.code === 200) {
        return data.result;

        }
      }
    throw new Error(checkOrder.error);
  } catch (error) {
    const e = error.response.data ? error.response.data : error;
    console.log(
      'This error occured when create new order :',
      e,
      'with status :',
      order,
    );
    return new Error("can't get order -sys-error :");

    }
  }

  async getOrder(orderId) {
    try {
      const { data } = await this.fetcher.get(`orders/${orderId}`);
      if (data.code === 200) {
        return data.result;
      }
    } catch (error) {
      const e = error.response.data ? error.response.data : error;
      console.log(
        'This error occured when try to getOrder:',
        e,
        'with that data  :',
        orderId,
      );
      return new Error("can't get order -sys-error :");
    }
  }

  async cancelOrder(orderId) {
    try {
      const { data } = await this.fetcher.delete(`orders/${orderId}`, {
        id: orderId,
      });
      if (data.code === 200) {
        return data.result;
      }
    } catch (error) {
      const e = error.response.data ? error.response.data : error;
      console.log(
        'This error occured when try to cancelOrder:',
        e,
        'with that data  :',
        orderId,
      );
      throw new Error('syst error: check log');
    }
  }

  async confirmOrder(orderId) {
    try {
      const { data } = await this.fetcher.delete(`orders/${orderId}/confirm`, {
        id: orderId,
      });
      if (data.code === 200) {
        return data.result;
      }
    } catch (error) {
      const e = error.response.data ? error.response.data : error;
      console.log(
        'This error occured when try to confirmOrder:',
        e,
        'with that data  :',
        orderId,
      );
      throw new Error('syst error: check log');
    }
  }

  async getContryCode() {
    try {
      const { data } = await this.fetcher.get('countries');
      if (data.code === 200) {
        return data.result;
      }
    } catch (error) {
      const e = error.response.data ? error.response.data : error;
      console.log(
        'This error occured when try to getOrder:',
        e,
        'with that data  :',
        orderId,
      );
      return new Error("can't get order -sys-error :");
    }
  }

async setWebhook(webhook) {

    try {
      const checkOrder = webhooksSchema.validate(webhook);
    if (typeof checkOrder.error === 'undefined') {
      const { data } = await this.fetcher.post('webhooks', webhook);
      if (data.code === 200) {
        return data.result;

        }
      }
    throw new Error(checkOrder.error);
  } catch (error) {
    const e = error.response.data ? error.response.data : error;
    console.log(
      'This error occured when create new order :',
      e,
      'with status :',
      order,
    );

return new Error("can't get order -sys-error :");




  }

}


  async getWebhook() {
    try {
      const { data } = await this.fetcher.get('webhooks');
      if (data.code === 200) {
        return data.result;
      }
    } catch (error) {
      const e = error.response.data ? error.response.data : error;
      console.log(
        'This error occured when create new order :',
        e,
        'with status :',
        order,
      );
      return new Error("can't get order -sys-error :");
    }
  }

  async deleteWebhook() {
    try {
      const { data } = await this.fetcher.delete('webhooks');
      if (data.code === 200) {
        return data.result;
      }
    } catch (error) {
      const e = error.response.data ? error.response.data : error;
      console.log(
        'This error occured when create new order :',
        e,
        'with status :',
        order,
      );
      return new Error("can't get order -sys-error :");
    }
  }

  // TAXE
}
