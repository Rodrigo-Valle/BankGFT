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
});

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER');
    await AppDataSource.destroy();
});

describe("UserGetController", () => {
    it('Deve retornar 200 ao buscar usuario autenticado', async () => {
        const response = await request(app).get('/usuario/me').set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data.id');
    });

    it('Deve retornar 400 ao buscar usuario não autenticado', async () => {
        const response = await request(app).get('/usuario/me').set('Authorization', '').send();

        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Por favor, autentique-se');
    });
});
