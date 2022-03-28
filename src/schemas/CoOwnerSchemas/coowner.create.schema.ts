import * as joi from "joi";

export const coOwnerCreateSchema = joi.object({
    id: joi.any().forbidden(),
    nome: joi.string().min(3).max(150).required().messages({
        'string.min': 'Nome deve possuir ao menos 3 caracteres',
        'string.max': 'Nome deve possuir no maximo 150 caracteres',
        'any.required': 'Campo nome é obrigatório'
    }),
    email: joi.string().email().required().messages({
        'string.email': 'Entre com e-mail válido',
        'any.required': 'Campo email é obrigatório'
    }),
    dataNasc: joi.date().raw().max('now').required().messages({
        'any.required': 'Campo data de nascimento é obrigatório',
        'date.base': 'O valor não corresponde a uma data valida',
        'date.max': 'A data não pode ser posterior a data de hoje'
    }),
    celular: joi.string().length(9).required().pattern(new RegExp(/[0-9]/)).messages({
        'any.required': 'Campo celular obrigatório',
        'string.pattern.base': 'Celular é composto por 9 numeros',
        'string.length': 'Celular é composto por 9 numeros'
    }),
    descricao: joi.string().required().messages({
        'any.required': 'Campo descrição obrigatório'
    })
});