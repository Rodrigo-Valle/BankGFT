import * as joi from "joi";

export const usuarioRecoverySchema = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'Entre com e-mail válido',
        'any.required': 'Campo email é obrigatório'
    }),
});