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
            senha: "abC12345",
            codigo: codigo
        });

        expect(response.status).toBe(200);
        expect(response.text).toBe('Senha alterada com sucesso');
    });

    it('Deve retornar 400 ao solicitar troca da senha com campo código inválido', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "email@teste.com",
            senha: "abC12345",
            codigo: "CodigoQualquer"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Código de recuperação inválido');
    });

    it('Deve retornar 400 ao solicitar troca da senha sem informar campo email', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "emailInexistente@test.com",
            senha: "abC12345",
            codigo: "CodigoQualquer"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Usuario não localizado');
    });

    it('Deve retornar 400 ao solicitar troca da senha sem campo código', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "emailInexistente@test.com",
            senha: "abC12345",
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo código é obrigatório');
    });
});

describe('UserChangePasswordController validações campo email', () => {
    it('Deve retornar 400 ao solicitar troca da senha sem informar campo email', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            senha: "abC12345",
            codigo: codigo
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo email é obrigatório');
    });

    it('Deve retornar 400 ao solicitar troca da senha com valor inválido para o campo email', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "testeInvalidoemail.com",
            senha: "abC12345",
            codigo: codigo
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Entre com e-mail válido');
    });
});

describe('UserChangePasswordController validações campo senha', () => {
    it('Deve retornar 400 se não for informado campo senha', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo senha é obrigatório');
    });

    it('Deve retornar 400 se for informado uma senha que possua apenas letras', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "abcdefgh"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua apenas numeros', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "12345678"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua mais de 8 caracteres', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "Abc123456"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua menos de 8 caracteres', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "Abc1234"
        });

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });
});