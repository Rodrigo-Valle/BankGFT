import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
        console.log('DataSourceUp');
    }).catch((e) => {
        console.log(e);
    })
})

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER')
    await AppDataSource.destroy()
})
describe('UserCreateController', () => {
    it('deve retornar 201 ao criar novo usuario', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "Abc12345"
        })

        console.log(response.status, response.text)

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('result.id')
    })
})

describe('UserCreateController validacão nome', () => {
    it('deve retornar 400 se não for informado um nome', async () => {
        const response = await request(app).post('/usuario').send({
            email: "email2@teste.com",
            senha: "Abc12345"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo nome é obrigatório');
    })

    it('deve retornar 400 se nome for menor a 3 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: 'Jo',
            email: "email2@teste.com",
            senha: "Abc12345"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Nome deve possuir ao menos 3 caracteres');
    })

    it('deve retornar 400 se nome for maior que 30 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Donec sagittis felis sed sem auctor volutpat',
            email: "email2@teste.com",
            senha: "Abc12345"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Nome deve possuir no maximo 30 caracteres');
    })
})

describe('UserCreateController validação email', () => {
    it('deve retornar 400 se não for informado um email', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            senha: "Abc12345"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo email é obrigatório');
    })

    it('deve retornar 400 se não for informado um email válido', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email qualquer",
            senha: "Abc12345"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Informe um e-mail válido');
    })
})

describe('UserCreateController validação senha', () => {
    it('deve retornar 400 se não for informado uma senha', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo senha é obrigatório');
    })

    it('deve retornar 400 se for informado uma senha que possua só letras', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "abcdefgh"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    })

    it('deve retornar 400 se for informado uma senha que possua só numeros', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    })

    it('deve retornar 400 se for informado uma senha que possua mais de 8 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "Abc123456"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    })

    it('deve retornar 400 se for informado uma senha que possua menos de 8 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "Abc1234"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    })  
})