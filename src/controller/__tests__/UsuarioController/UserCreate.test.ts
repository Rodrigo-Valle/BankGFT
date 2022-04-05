import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
    }).catch((e) => {
        console.log(e);
    });
});

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER');
    await AppDataSource.destroy();
});

describe('UserCreateController Tests', () => {
    it('Deve retornar 201 ao criar novo usuario', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "Abc12345"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data.id');
    });
});

describe('UserCreateController validacão campo nome', () => {
    it('Deve retornar 400 se não for informado campo nome', async () => {
        const response = await request(app).post('/usuario').send({
            email: "email2@teste.com",
            senha: "Abc12345"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo nome é obrigatório');
    });

    it('Deve retornar 400 se nome for menor a 3 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: 'Jo',
            email: "email2@teste.com",
            senha: "Abc12345"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nome deve possuir ao menos 3 caracteres');
    });

    it('Deve retornar 400 se nome for maior que 30 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Donec sagittis felis sed sem auctor volutpat',
            email: "email2@teste.com",
            senha: "Abc12345"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nome deve possuir no maximo 30 caracteres');
    });
});

describe('UserCreateController validação campo email', () => {
    it('Deve retornar 400 se não for informado campo email', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            senha: "Abc12345"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo email é obrigatório');
    });

    it('Deve retornar 400 se não for informado campo email válido', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email qualquer",
            senha: "Abc12345"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Informe um e-mail válido');
    });
});

describe('UserCreateController validação campo senha', () => {
    it('Deve retornar 400 se não for informado campo senha', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo senha é obrigatório');
    });

    it('Deve retornar 400 se for informado uma senha que possua só letras', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "abcdefgh"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua só numeros', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua mais de 8 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "Abc123456"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });

    it('Deve retornar 400 se for informado uma senha que possua menos de 8 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "Abc1234"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    });
});