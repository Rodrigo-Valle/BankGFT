import * as joi from "joi";

export const userChangePasswordSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.email': 'Entre com e-mail válido',
        'any.required': 'Campo email é obrigatório'
    }),
    senha: joi.string().required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8}$/)).messages({
        'any.required': "Campo senha é obrigatório",
        'string.pattern.base': "A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero"
    }),
    codigo: joi.string().required().messages({ 'any.required': "Campo código é obrigatório" })
});