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
        console.log('DataSourceUp');
    }).catch((e) => {
        console.log(e);
    })

    const result = await fakeUser.createUserAndGenerateToken();
    token = result.token;
    account = await fakeAccount.createAccount(result.user);
})

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER')
    await AppDataSource.destroy()
})

describe('GetAccountController', () => {
    afterEach(async () => {
        await AppDataSource.query('DELETE FROM ACCOUNT')
    })
    it('Deve retornar 200 e a conta do usuario logado', async () => {
        console.log(account)

        console.log(token);

        const response = await request(app).get(`/dados-conta/${account.id}`).set('Authorization', `Bearer ${token}`).send();


        console.log(response.text)
        expect(response.status).toBe(200);
    })
})