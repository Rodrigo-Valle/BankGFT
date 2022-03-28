import * as joi from "joi";
import { StatusAccount } from "../../entity/enum/StatusAccountEnum";

export const accountUpdateSchema = joi.object({
    id: joi.any().forbidden(),
    saldo: joi.number().positive().messages({
        'number.base': "obrigatório valor numérico",
        'number.positive': "informar valor de saldo positivo"
    }),
    cartaoCredito: joi.string().creditCard().messages({
        'any.required': 'Campo cartão é obrigatório',
        'string.creditCard': 'Campo cartão é composto por uma sequencia de 16 numeros sem espaços ou separadores'
    }),
    usuario: joi.any().forbidden(),
    status: joi.string().valid(...Object.values(StatusAccount))
});