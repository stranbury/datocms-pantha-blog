import Joi from "joi";
export const rawProducts = Joi.array().items(Joi.object().keys({
  id: Joi.any().id(),
        external_id: Joi.string(),
        name: Joi.string(),
        variants: Joi.number(),
        synced: Joi.number(),
        thumbnail_url:  Joi.string().uri()
}))
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
  external_id: Joi.string(),
  shipping: Joi.string(),
  status: Joi.string().required(),
  recipient: Joi.object({
    name: Joi.string().required(),
    address1: Joi.string().required(),
    city: Joi.string().required(),
    state_code: Joi.string().required(),
    state_name: Joi.string().required(),
    country_code: Joi.string().required(),
    zip: Joi.string().required(),
  }).required(),
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string(),
        external_variant_id: Joi.string(),
        quantity: Joi.number(),
        variant_id: Joi.string(),
        name: Joi.string(),
        retail_price: Joi.string(),
        files: Joi.array()
          .items(
            Joi.object({
              id: Joi.number(),
              type: Joi.string(),
              hash: Joi.string(),
              url: Joi.string().allow(null),
              filename: Joi.string(),
              mime_type: Joi.string(),
              size: Joi.number(),
              width: Joi.number(),
              height: Joi.number(),
              dpi: Joi.number(),
              status: Joi.string(),
              created: Joi.date().timestamp(),
              thumbnail_url: Joi.string(),
              preview_url: Joi.string(),
              visible: Joi.boolean(),
              options: [
                {
                  id: Joi.string(),
                  value: Joi.alternatives().try(
                    Joi.array().items(Joi.string()),
                    Joi.string(),
                  ),
                },
              ],
            }),
          )
          .required(),
        options: [
          {
            id: Joi.string(),
            value: Joi.alternatives().try(
              Joi.array().items(Joi.string()),
              Joi.string(),
            ),
          },
        ],
      }),
    )
    .required(),
  retail_costs: Joi.object({
    currency: Joi.string(),
    subtotal: Joi.string(),
    discount: Joi.string(),
    digitization: Joi.string(),
    tax: Joi.string(),
    vat: Joi.string(),
    total: Joi.string(),
  }),
  gift: Joi.object({
    subject: Joi.string(),
    message: Joi.string(),
  }),
  packing_slip: Joi.object({
    email: Joi.string(),
    phone: Joi.string(),
    message: Joi.string(),
    logo_url: Joi.string(),
  }),
});

