import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';

var codigo;

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
    }).catch((e) => {
        console.log(e);
    });

    codigo = await fakeUser.createUserWithCode();
});

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER');
    await AppDataSource.destroy();
});

describe('UserChangePasswordController Tests', () => {
    it('Deve retornar 200 ao solicitar troca da senha', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "email@teste.com",
            senha: "32165498",
            codigo: codigo
        });

        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Senha alterada com sucesso');
    });

    it('Deve retornar 400 ao solicitar troca da senha com campo código inválido', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "email@teste.com",
            senha: "87654321",
            codigo: "CodigoQualquer"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Código de recuperação inválido');
    });

    it('Deve retornar 400 ao solicitar troca da senha sem informar campo email', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "emailInexistente@test.com",
            senha: "87654321",
            codigo: "CodigoQualquer"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Usuario não localizado');
    });

    it('Deve retornar 400 ao solicitar troca da senha sem campo código', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "emailInexistente@test.com",
            senha: "87654321",
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo código é obrigatório');
    });
});

describe('UserChangePasswordController validações campo email', () => {
    it('Deve retornar 400 ao solicitar troca da senha sem informar campo email', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            senha: "87654321",
            codigo: codigo
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo email é obrigatório');
    });

    it('Deve retornar 400 ao solicitar troca da senha com valor inválido para o campo email', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "testeInvalidoemail.com",
            senha: "87654321",
            codigo: codigo
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Entre com e-mail válido');
    });
});

describe('UserChangePasswordController validações campo senha', () => {
    it('Deve retornar 400 se não for informado campo senha', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo senha é obrigatório');
    });

    it('Deve retornar 400 se for informado uma senha que possua letras', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "ab123fgh"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });

    it('Deve retornar 400 se for informado uma senha que possua mais de 8 numeros', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: 'email@teste.com',
            codigo: codigo,
            senha: "8765432198"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });

    it('Deve retornar 400 se for informado uma senha que possua menos de 8 numeros', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "12345"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });
});