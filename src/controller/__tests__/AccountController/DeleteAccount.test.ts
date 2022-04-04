import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';
import { fakeAccount } from '../../../utils/mocks/fakeAccount';

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

describe('DeleteAccountController', () => {
    it('Deve retornar 200 e deletar a conta solicitada de um usuario autenticado', async () => {
        const response = await request(app).delete(`/conta/${account.id}`).set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(200);
    });

    it('Deve retornar 400 ao deletar uma conta que não existe ou pertença a outro usuario', async () => {
        const response = await request(app).delete(`/conta/${account.id + 1000}`).set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Conta não localizada');
    });

    it('Deve retornar 400 ao tentar deletar uma conta de usuario não autenticado', async () => {
        const response = await request(app).delete(`/conta/${account.id + 1000}`).set('Authorization', ``).send();

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Por favor, autentique-se');
    });
});    