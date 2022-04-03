import * as joi from "joi";
import { StatusAccount } from "../../entity/enum/StatusAccountEnum";

export const accountUpdateSchema = joi.object({
    id: joi.any().forbidden(),
    saldo: joi.number().messages({
        'number.base': "Obrigatório valor numérico",
    }),
    cartaoCredito: joi.string().creditCard().messages({
        'any.required': 'Campo cartão é obrigatório',
        'string.creditCard': 'Cartão invalido'
    }),
    usuario: joi.any().forbidden(),
    status: joi.string().valid(...Object.values(StatusAccount))
});