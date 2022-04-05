import * as joi from "joi";

export const accountCreateSchema = joi.object({
    id: joi.any().forbidden(),
    saldo: joi.number().positive().messages({
        'number.base': "Obrigatório valor numérico",
        'number.positive': "informar valor de saldo positivo"
    }),
    cartaoCredito: joi.string().creditCard().required().messages({
        'any.required': 'Campo cartão é obrigatório',
        'string.creditCard': 'Campo cartão é composto por uma sequencia de 16 numeros sem espaços ou separadores'
    }),
    usuario: joi.any().forbidden(),
    status: joi.any().forbidden()
});