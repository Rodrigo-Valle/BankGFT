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
    it('Deve retornar 201 ao fazer login válido', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "email@teste.com",
            senha: "Abc12345"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('result.id');
        expect(response.body).toHaveProperty('token');
    });

    it('Deve retornar 400 ao fazer login com email não cadastrado', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "emailErrado@teste.com",
            senha: "Abc12345"
        });

        expect(response.status).toBe(400);
    });

    it('Deve retornar 400 ao fazer login com senha incorreta', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "email@teste.com",
            senha: "12345Abc"
        });

        expect(response.status).toBe(400);
    });
});

describe('UserLoginController validações campo email', () => {
    it('Deve retornar 400 ao não informar campo email', async () => {
        const response = await request(app).post('/usuario/auth').send({
            senha: "Abc12345"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Campo email é obrigatório");
    });

    it('Deve retornar 400 ao informar campo email invalido', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "email invalido",
            senha: "Abc12345"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Entre com e-mail válido");
    });
});

describe('UserLoginController validações campo senha', () => {
    it('Deve retornar 400 ao não informar campo senha', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "email@teste.com"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe("Campo senha é obrigatório");
    });

    it('Deve retornar 400 se for informado uma senha que possua só letras', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "email@teste.com",
            senha: "abcdefgh"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua só numeros', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "email@teste.com",
            senha: "12345678"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua mais de 8 caracteres', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "email@teste.com",
            senha: "Abc123456"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua menos de 8 caracteres', async () => {
        const response = await request(app).post('/usuario/auth').send({
            email: "email@teste.com",
            senha: "Abc1234"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });
});