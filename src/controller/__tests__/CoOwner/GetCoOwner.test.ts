import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';
import { fakeCoOwner } from '../../../utils/mocks/FakeCoOwner';

var token;
var result;
var coOwner;

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

describe('GetCoOwnerController Tests', () => {
    afterEach(async () => {
        await AppDataSource.query('DELETE FROM CO_OWNER');
    });

    it('Deve retornar 200 e todos coowners do usuario autenticado', async () => {
        await fakeCoOwner.createCoOwner(result.user);
        await fakeCoOwner.createCoOwner(result.user);

        const response = await request(app).get(`/co-titular`).set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(200);
    });

    it('Deve retornar 200 e coowner solicitado do usuario autenticado', async () => {
        coOwner = await fakeCoOwner.createCoOwner(result.user);

        const response = await request(app).get(`/co-titular/${coOwner.id}`).set('Authorization', `Bearer ${token}`).send();

        expect(response.status).toBe(200);
        expect(response.body.data.coTitulares[0].id).toBe(coOwner.id);
    });

    it('Deve retornar 400 ao receber solicitação de usuario não autenticado', async () => {

        const response = await request(app).get(`/co-titular`).set('Authorization', ``).send();

        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Por favor, autentique-se");
    });
});