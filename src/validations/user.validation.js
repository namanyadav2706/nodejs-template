import Joi from "joi";

const userSchema = Joi.object({
    id: Joi.string().alphanum().length(24).required()
});

export default userSchema;
