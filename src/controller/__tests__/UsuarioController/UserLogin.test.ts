import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
    }).catch((e) => {
        console.log(e);
    });

    await fakeUser.createUser();
});

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER');
    await AppDataSource.destroy();
});

describe('UserLoginController', () => {
    it('Deve retornar 200 ao fazer login válido', async () => {
        const response = await request(app).post('/usuario/auth').send({
            username: "teste",
            senha: "12345678"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data.result.id');
        expect(response.body).toHaveProperty('data.token');
    });

    it('Deve retornar 400 ao fazer login com username não cadastrado', async () => {
        const response = await request(app).post('/usuario/auth').send({
            username: "username nao cadastrado",
            senha: "12345678"
        });

        expect(response.status).toBe(400);
    });

    it('Deve retornar 400 ao fazer login com senha incorreta', async () => {
        const response = await request(app).post('/usuario/auth').send({
            username: "teste",
            senha: "12345432"
        });

        expect(response.status).toBe(400);
    });
});

describe('UserLoginController validações campo username', () => {
    it('Deve retornar 400 ao não informar campo username', async () => {
        const response = await request(app).post('/usuario/auth').send({
            senha: "12345678"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Campo username é obrigatório");
    });

});

describe('UserLoginController validações campo senha', () => {
    it('Deve retornar 400 ao não informar campo senha', async () => {
        const response = await request(app).post('/usuario/auth').send({
            username: "teste"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Campo senha é obrigatório");
    });

    it('Deve retornar 400 se for informado uma senha que possua letras', async () => {
        const response = await request(app).post('/usuario/auth').send({
            username: "teste",
            senha: "abc1325h"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });

    it('Deve retornar 400 se for informado uma senha que possua mais de 8 caracteres', async () => {
        const response = await request(app).post('/usuario/auth').send({
            username: "teste",
            senha: "123456786"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });

    it('Deve retornar 400 se for informado uma senha que possua menos de 8 caracteres', async () => {
        const response = await request(app).post('/usuario/auth').send({
            username: "teste",
            senha: "1234"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });
});