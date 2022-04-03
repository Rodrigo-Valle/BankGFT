import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';
import { fakeAccount } from '../../../utils/mocks/fakeAccount';
import { StatusAccount } from '../../../entity/enum/StatusAccountEnum';

var token;
var account;

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
    }).catch((e) => {
        console.log(e);
    });

    const result = await fakeUser.createUserAndGenerateToken();
    token = result.token;
    account = await fakeAccount.createAccount(result.user);
});

afterAll(async () => {
    await AppDataSource.query('DELETE FROM ACCOUNT');
    await AppDataSource.query('DELETE FROM USER');
    await AppDataSource.destroy();
});

describe('UpdateAccountController Tests', () => {
    it('Deve retornar 200 e atualizar uma conta de um usuario autenticado', async () => {
        const response = await request(app).patch(`/conta/${account.id}`).set('Authorization', `Bearer ${token}`).send({
            saldo: 500,
            cartaoCredito: "5362319675394659",
            status: 'inativa'
        });

        expect(response.status).toBe(200);
        expect(response.body.result.cartao_credito).toBe("5362319675394659");
    });

    it('Deve retornar 200 e atualizar apenas o campo saldo de uma conta de um usuario autenticado', async () => {
        const response = await request(app).patch(`/conta/${account.id}`).set('Authorization', `Bearer ${token}`).send({
            saldo: 1000
        });

        expect(response.status).toBe(200);
        expect(response.body.result.saldo).toBe(1000);
    });

    it('Deve retornar 200 e atualizar apenas o campo cartão de uma conta de um usuario autenticado', async () => {
        const response = await request(app).patch(`/conta/${account.id}`).set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "4532605930348920"
        });

        expect(response.status).toBe(200);
        expect(response.body.result.cartao_credito).toBe("4532605930348920");
    });

    it('Deve retornar 200 e atualizar apenas o campo status de uma conta de um usuario autenticado', async () => {
        const response = await request(app).patch(`/conta/${account.id}`).set('Authorization', `Bearer ${token}`).send({
            status: "inadimplente"
        });

        expect(response.status).toBe(200);
        expect(response.body.result.status).toBe(StatusAccount.INADIMPLENTE);
    });

    it('Deve retornar 401 ao atualizar uma conta de um usuario não autenticado', async () => {
        const response = await request(app).patch(`/conta/${account.id}`).set('Authorization', ``).send({
            saldo: 500,
            cartaoCredito: "5362319675394659",
            status: 'inativa'
        });

        expect(response.status).toBe(401);
        expect(response.text).toBe('Por favor, autentique-se');
    });
});

describe('UpdateAccountController validações', () => {
    it('Deve retornar 400 ao passar valor inválido para o campo saldo', async () => {
        const response = await request(app).patch(`/conta/${account.id}`).set('Authorization', `Bearer ${token}`).send({
            saldo: "Saldo",
            cartaoCredito: "5362319675394659",
            status: 'inativa'
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Obrigatório valor numérico');
    });

    it('Deve retornar 400 ao passar valor inválido para o campo cartão de credito', async () => {
        const response = await request(app).patch(`/conta/${account.id}`).set('Authorization', `Bearer ${token}`).send({
            cartaoCredito: "1234123412341234",
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Cartão invalido');
    });
    it('Deve retornar 400 ao passar valor inválido para o campo status', async () => {
        const response = await request(app).patch(`/conta/${account.id}`).set('Authorization', `Bearer ${token}`).send({
            status: "status invalido"
        });

        expect(response.status).toBe(400);
    });
});