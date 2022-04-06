import * as joi from "joi";

export const userLoginSchema = joi.object({
    username: joi.string().required().messages({
        'any.required': 'Campo username é obrigatório'
    }),
    senha: joi.string().required().pattern(new RegExp(/^[0-9]{8}$/)).messages({
        'any.required': "Campo senha é obrigatório",
        'string.pattern.base': "A senha deve possuir 8 numeros"
    }),
});