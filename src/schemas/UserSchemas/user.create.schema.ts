import * as joi from "joi";

export const userCreateSchema = joi.object({
    id: joi.any().forbidden(),
    nome: joi.string().min(3).max(30).required().messages({
        'string.min': 'Nome deve possuir ao menos 3 caracteres',
        'string.max': 'Nome deve possuir no maximo 30 caracteres',
        'any.required': 'Campo nome é obrigatório'
    }),
    email: joi.string().email().required().messages({
        'string.email': 'Informe um e-mail válido',
        'any.required': 'Campo email é obrigatório'
    }),
    senha: joi.string().required().pattern(new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8}$/)).messages({
        'any.required': "Campo senha é obrigatório",
        'string.pattern.base': "A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero"
    }),
    codigo_reset: joi.any().forbidden()
});



