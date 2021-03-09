import Joi from "joi";

const rawProduct = Joi.object().keys({
  id: Joi.any().id(),
  external_id: Joi.string(),
  name: Joi.string().empty(''),
  variants: Joi.number(),
  synced: Joi.number(),
  thumbnail_url: Joi.string().uri(),
});
const productInVariant = Joi.object().keys({
  variant_id: Joi.any().id(),
  product_id: Joi.any().id(),
  image: Joi.string().uri(),
  name: Joi.string().empty(''),
});
const filesInVariants = Joi.object().keys({
  id: Joi.any().id(),
  type: Joi.string(),
  hash: Joi.string().allow(null),
  url: Joi.string().uri().allow(null),
  filename: Joi.string(),
  mime_type: Joi.string(),
  size: Joi.number(),
  width: Joi.number(),
  height: Joi.number(),
  dpi: Joi.number().allow(null),
  status: Joi.string(),
  created: Joi.date().timestamp(),
  thumbnail_url: Joi.string().uri(),
  preview_url: Joi.string().uri(),
  visible: Joi.bool(),
});
const optionsInVariant = Joi.object().keys({
  id: Joi.string(),
  value: [Joi.string(), Joi.array()],
});

const productVariant = Joi.object().keys({
  id: Joi.any().id(),
  external_id: Joi.string(),
  sync_product_id: Joi.any().id(),
  name: Joi.string().empty(''),
  synced: Joi.bool(),
  variant_id: Joi.any().id(),
  warehouse_product_variant_id: null,
  retail_price: Joi.string(),
  sku: Joi.string(),
  currency: Joi.string(),
  product: productInVariant,
  files: Joi.array().items(filesInVariants),
  options: Joi.array().items(optionsInVariant),
  brand: Joi.string(),
  brandDetail: Joi.string(),
  capsule: Joi.string(),
  categorie: Joi.string(),
  sexe: Joi.string(),
  color: Joi.string(),
  size: Joi.string(),
});
const Product = Joi.object().keys({
  id: Joi.any().id(),
  external_id: Joi.string(),
  name: Joi.string().empty(''),
  variants: Joi.array().items(productVariant),
  synced: Joi.number(),
  thumbnail_url: Joi.string().uri(),
  brand: Joi.string(),
  brandDetail: Joi.string(),
  capsule: Joi.string(),
  categorie: Joi.string(),
  sexe: Joi.string(),
});

const recipient = Joi.object({
  name: Joi.string().allow(null),
  company: Joi.string().allow(null),
  address1: Joi.string().allow(null),
  address2: Joi.string().allow(null),
  city: Joi.string().allow(null),
  state_code: Joi.string().allow(null),
  state_name: Joi.string().allow(null),
  country_name: Joi.string().allow(null),
  country_code: Joi.string().empty(''),
  zip: Joi.string().allow(null),
  phone: Joi.string().allow(null),
  email: Joi.string().allow(null),
});

const orderItem = Joi.array().items(
  Joi.object({
    id: Joi.any().id(),
    external_variant_id: Joi.any().id(),
    external_id: Joi.any().id(),
    sync_variant_id: Joi.any().id(),
    quantity: Joi.number(),
    variant_id: Joi.any().id(),
    name: Joi.string(),
    price: Joi.string(),
    product: productInVariant,
    retail_price: Joi.string(),
    files: Joi.array().items(filesInVariants).required(),
    options: Joi.array().items(optionsInVariant),
    sku: null,
    discontinued: Joi.bool(),
    out_of_stock_eu: Joi.bool(),
    out_of_stock: Joi.bool(),
  }),
);

const retail_costs = Joi.object({
  currency: [Joi.string(), Joi.number()],
  subtotal: [Joi.string(), Joi.number()],
  discount: [Joi.string(), Joi.number()],
  shipping: [Joi.string(), Joi.number()],
  digitization: [Joi.string(), Joi.number()],
  tax: [Joi.string(), Joi.number(), Joi.allow(null)],
  vat: [Joi.string(), Joi.number(), Joi.allow(null)],
  total: [Joi.string(), Joi.number(), Joi.allow(null)],
});

const orderGift = Joi.object({
  subject: Joi.string(),
  message: Joi.string(),
});
const packingSlip = Joi.object({
  email: Joi.string(),
  phone: Joi.string(),
  message: Joi.string(),
  logo_url: Joi.string(),
});
const costs = Joi.object({
  currency: [Joi.string(), Joi.number()],
  subtotal: [Joi.string(), Joi.number()],
  discount: [Joi.string(), Joi.number()],
  shipping: [Joi.string(), Joi.number()],
  digitization: [Joi.string(), Joi.number()],
  additional_fee: [Joi.string(), Joi.number()],
  fulfillment_fee: [Joi.string(), Joi.number()],
  tax: [Joi.string(), Joi.number()],
  vat: [Joi.string(), Joi.number()],
  total: [Joi.string(), Joi.number()],
});
const pricingBreakdown = Joi.object({
  customer_pays: Joi.string(),
  printful_price: Joi.string(),
  profit: Joi.string(),
  currency_symbol: Joi.string(),
});

export const rawProducts = Joi.array().items(rawProduct);
export const products = Joi.array().items(Product);

export const contryCodesSchema = Joi.array().items(
  Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    states: Joi.array()
      .items(
        Joi.object().keys({
          code: Joi.string(),
          name: Joi.string(),
        }),
      )
      .allow(null),
  }),
);
export const webhooksSchema = Joi.object().keys({
  url: Joi.string().allow(null),
  types: Joi.array().items(
    Joi.string().valid(
      'package_shipped',
      'stock_updated',
      'package_returned',
      'order_failed',
      'order_canceled',
      'product_synced',
      'product_updated',
      'stock_updated',
      'order_put_hold',
      'order_remove_hold',
    ),
  ),
  params: Joi.any().allow(null),
});
export const orderSchema = Joi.object({
      id: Joi.any().id(),
      external_id: Joi.any().id(),
      store: Joi.any().id(),
      status: Joi.string(),
      error: Joi.object().allow(null),
      errorCode: Joi.number(),
      shipping: Joi.string(),
      shipping_service_name:Joi.string(), 
      created: Joi.date(),
      updated: Joi.date(),
      recipient: recipient,
      notes: Joi.number().allow(null),
      items: orderItem,
      incomplete_items: Joi.array().items(orderItem),
      is_sample: Joi.boolean(),
      needs_approval: Joi.boolean(),
      not_synced: Joi.boolean(),
      has_discontinued_items: Joi.boolean(),
      can_change_hold: Joi.boolean(),
      costs,
      retail_costs: retail_costs,
      shipments: Joi.array(),
      gift:[ orderGift, Joi.allow(null)],
      packing_slip: packingSlip.allow(null),
      dashboard_url: Joi.string().uri(),
      pricing_breakdown: Joi.array().items(pricingBreakdown)
});
export const orders = Joi.array().items(orderSchema);

export const estimationOrder = Joi.object({
        id: Joi.any().id(),
        external_id: Joi.any().id().empty(''),
        variant_id: Joi.any().id().empty(''), 
        sync_variant_id: Joi.any().id().allow(null),
        external_variant_id: Joi.any().id().allow(null),
        quantity: Joi.number(),
        price: Joi.string(),
        costs,
        retail_price: Joi.string(),
        retail_costs: retail_costs,
        name: Joi.string(),
        product: productInVariant,
        files: Joi.array().items(filesInVariants),
        options: Joi.array().items(optionsInVariant),
        sku: Joi.any().id().allow(null),
        discontinued: Joi.boolean(),
        out_of_stock_eu: Joi.boolean(),
        out_of_stock: Joi.boolean()
      })


