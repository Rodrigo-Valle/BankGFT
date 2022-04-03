import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';

var token;

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
    }).catch((e) => {
        console.log(e);
    });

    const result = await fakeUser.createUserAndGenerateToken();
    token = result.token;
})

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER');
    await AppDataSource.destroy();
})

describe("CreateAccountController Tests", () => {
    afterEach(async () => {
        await AppDataSource.query('DELETE FROM ACCOUNT');
    });

    it('Deve retornar 201 e retornar conta ao criar nova conta', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            saldo: 500,
            cartaoCredito: "4539644564076054"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('result.cartao_credito');
    });

    it('Deve retornar 201 ao criar nova conta sem informar saldo', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4539644564076054"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('result.cartao_credito');
    });

    it('Deve retornar 400 ao tentar criar conta sem usuario estar autenticado', async () => {
        const response = await request(app).post('/conta').set('Authorization', '').send({
        });

        expect(response.status).toBe(401);
        expect(response.text).toBe('Por favor, autentique-se');
    });
});
describe("CreateAccountController validações campo cartão", () => {
    it('Deve retornar 400 ao criar conta sem informar campo cartão', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo cartão é obrigatório');
    });

    it('Deve retornar 400 ao passar valor inválido no campo cartão', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4539AS6445640760xzc;54"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo cartão é composto por uma sequencia de 16 numeros sem espaços ou separadores');
    });
});

describe("CreateAccountController validações saldo", () => {
    it('Deve retornar 400 ao passar valor negativo para o campo saldo', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4539644564076054",
            saldo: -500
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('informar valor de saldo positivo');
    });

    it('Deve retornar 400 ao passar valor inválido para o campo saldo', async () => {
        const response = await request(app).post('/conta').set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4539644564076054",
            saldo: "saldo"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Obrigatório valor numérico');
    });
});

