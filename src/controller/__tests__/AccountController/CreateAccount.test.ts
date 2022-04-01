import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';

var token;

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
        console.log('DataSourceUp');
    }).catch((e) => {
        console.log(e);
    })

    token = await fakeUser.createUserAndGenerateToken()
})

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER')
    await AppDataSource.destroy()
})

describe("CreateAccountController", () => {
    afterEach(async () => {
        await AppDataSource.query('DELETE FROM ACCOUNT')
    })
    it('deve retornar 201 ao criar nova conta', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            saldo: 500,
            cartaoCredito: "4539644564076054"
        })

        console.log(response.status, response.text)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('result.cartao_credito')
    })

    it('deve retornar 201 ao criar nova conta sem informar saldo', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4539644564076054"
        })

        console.log(response.status, response.text)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('result.cartao_credito')
    })

    it('deve retornar 400 ao criar conta sem estar autenticado', async () => {
        const response = await request(app).post('/conta').set('Authorization', '').send({
        })

        expect(response.status).toBe(401);
        expect(response.text).toBe('Por favor, autentique-se')
    })


})
describe("CreateAccountController validações cartão", () => {
    it('deve retornar 400 ao criar conta sem informar cartão', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
        })

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo cartão é obrigatório')
    })
    it('deve retornar 400 ao passar cartão inválido', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4539AS6445640760xzc;54"
        })

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo cartão é composto por uma sequencia de 16 numeros sem espaços ou separadores')
    })
})

describe("CreateAccountController validações saldo", () => {
    it('deve retornar 400 ao passar saldo negativo', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4539644564076054",
            saldo: -500
        })

        expect(response.status).toBe(400);
        expect(response.text).toBe('informar valor de saldo positivo')
    })

    it('deve retornar 400 ao passar saldo inválido', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4539644564076054",
            saldo: "saldo"
        })

        expect(response.status).toBe(400);
        expect(response.text).toBe('Obrigatório valor numérico')
    })
})

