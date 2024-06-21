import joi from "@hapi/joi";

export function validateCreateComment(data) {
  const Comment = joi.object({
    id: joi.number().integer(),
    userId: joi.number().integer().required(),
    productId: joi.number().integer().required(),
    eggs: joi.number().integer().min(0).max(5).required(),
    content: joi.string().required(),
  });
  return Comment.validate(data);
}

