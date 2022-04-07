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
    senha: joi.string().required().pattern(new RegExp(/^[0-9]{8}$/)).messages({
        'any.required': "Campo senha é obrigatório",
        'string.pattern.base': "A senha deve possuir 8 numeros"
    }),
    username: joi.string().required().messages({
        'any.required': 'Campo username é obrigatório'
    }),
    dataNasc: joi.date().raw().max('now').required().messages({
        'any.required': 'Campo data de nascimento é obrigatório',
        'date.base': 'O valor não corresponde a uma data valida',
        'date.max': 'A data não pode ser posterior a data de hoje'
    }),
    celular: joi.string().min(9).max(15).required().pattern(new RegExp(/[0-9]/)).messages({
        'any.required': 'Campo celular obrigatório',
        'string.pattern.base': 'Celular é composto por 9 numeros',
        'string.min': 'Celular é composto por no minimo 9 numeros',
        'string.max': 'Celular é composto por no maximo 15 numeros'
    }),
    descricao: joi.string().required().messages({
        'any.required': 'Campo descrição obrigatório'
    }),
    codigo_reset: joi.any().forbidden()
});



