import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';

var codigo = 

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
        console.log('DataSourceUp');
    }).catch((e) => {
        console.log(e);
    })

    codigo = await fakeUser.createUserWithCode();
})

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER')
    await AppDataSource.destroy()
})
describe('UserChangePasswordController', () => {
    it('deve retornar 200 ao solicitar troca da senha', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "email@teste.com",
            senha: "abC12345",
            codigo: codigo
        })

        console.log(response.status, response.text)

        expect(response.status).toBe(200);
        expect(response.text).toBe('Senha alterada com sucesso')
    })

    it('deve retornar 400 ao solicitar troca da senha com código inválido', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "email@teste.com",
            senha: "abC12345",
            codigo: "CodigoQualquer"
        })

        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Código de recuperação inválido')
    })

    it('deve retornar 400 ao solicitar troca da senha com email inexistente', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "emailInexistente@test.com",
            senha: "abC12345",
            codigo: "CodigoQualquer"
        })

        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Usuario não localizado')
    })

    it('deve retornar 400 ao solicitar troca da senha sem código', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "emailInexistente@test.com",
            senha: "abC12345",
        })

        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo código é obrigatório')
    })


})

describe('UserChangePasswordController validações email', () => {
    it('deve retornar 400 ao solicitar troca da senha sem informar email', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            senha: "abC12345",
            codigo: codigo
        })

        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo email é obrigatório')
    })
    it('deve retornar 400 ao solicitar troca da senha com email inválido', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "testeInvalidoemail.com",
            senha: "abC12345",
            codigo: codigo
        })

        expect(response.status).toBe(400);
        expect(response.text).toBe('Entre com e-mail válido')
    })
})

describe('UserChangePasswordController validações senha', () => {
    it('deve retornar 400 se não for informado uma senha', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo senha é obrigatório');
    })

    it('deve retornar 400 se for informado uma senha que possua só letras', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "abcdefgh"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    })

    it('deve retornar 400 se for informado uma senha que possua só numeros', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "12345678"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    })

    it('deve retornar 400 se for informado uma senha que possua mais de 8 caracteres', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "Abc123456"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    })

    it('deve retornar 400 se for informado uma senha que possua menos de 8 caracteres', async () => {
        const response = await request(app).post('/usuario/change-password').send({
            email: "teste@email.com",
            codigo: codigo,
            senha: "Abc1234"
        });
        console.log(response.status, response.text)

        expect(response.status).toBe(400);
        expect(response.text).toBe('A senha deve possuir 8 caracteres, e conter pelo menos uma letra miniuscula, uma maiuscula e um numero');
    })  
})