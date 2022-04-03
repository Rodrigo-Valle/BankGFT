import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';
import { fakeAccount } from '../../../utils/mocks/fakeAccount';

var token;
var account;
var result;

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
    }).catch((e) => {
        console.log(e);
    });

    result = await fakeUser.createUserAndGenerateToken();
    token = result.token;
});

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER');
    await AppDataSource.destroy();
});

describe('GetAccountController Tests', () => {
    afterEach(async () => {
        await AppDataSource.query('DELETE FROM ACCOUNT');
    });
    
    it('Deve retornar 200 e as contas do usuario logado', async () => {
        await fakeAccount.createAccount(result.user);
        await fakeAccount.createAccount(result.user);

        const response = await request(app).get(`/dados-conta`).set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(200);
    });

    it('Deve retornar 200 e a conta solicitada do usuario logado', async () => {
        account = await fakeAccount.createAccount(result.user);

        const response = await request(app).get(`/dados-conta/${account.id}`).set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(200);
    });

    it('Deve retornar 400 caso usuario não possua contas', async () => {

        const response = await request(app).get(`/dados-conta`).set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(400);
        expect(response.text).toBe('Usuario não possui contas');
    });

    it('Deve retornar 400 se usuario informar id de conta inválido, de outro usuario ou inexistente', async () => {
        account = await fakeAccount.createAccount(result.user);

        const response = await request(app).get(`/dados-conta/${account.id + 100}`).set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(400);
        expect(response.text).toBe('Conta não localizada');
    });

    it('Deve retornar 400 se usuario não estiver logado', async () => {
        const response = await request(app).get(`/dados-conta`).set('Authorization', ``).send();

        expect(response.status).toBe(401);
        expect(response.text).toBe('Por favor, autentique-se');
    });

    it('Deve retornar 400 se usuario tentar consultar uma conta e não estiver logado', async () => {
        const response = await request(app).get(`/dados-conta/5`).set('Authorization', ``).send();

        expect(response.status).toBe(401);
        expect(response.text).toBe('Por favor, autentique-se');
    });
});