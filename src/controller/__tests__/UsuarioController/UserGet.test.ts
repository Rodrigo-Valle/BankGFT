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

    const result = await fakeUser.createUserAndGenerateToken();
    token = result.token;
})

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER')
    await AppDataSource.destroy()
})

describe("UserGetController", () => {
    it('deve retornar 200 ao buscar usuario logado', async () => {
        const response = await request(app).get('/usuario/me').set('Authorization', `Bearer ${token}`).send();

        console.log(response.text)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('result.id')
    })

    it('deve retornar 400 ao buscar usuario deslogado', async () => {
        const response = await request(app).get('/usuario/me').set('Authorization', '').send();

        console.log(response.text)
        expect(response.status).toBe(401);
        expect(response.text).toBe('Por favor, autentique-se')
    })
})
