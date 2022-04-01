import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { CreateUserService } from '../../../service/UserService/CreateUserService';
import { fakeUser } from '../../../utils/mocks/fakeUser';

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
        console.log('DataSourceUp');
    }).catch((e) => {
        console.log(e);
    })

    await fakeUser.createUser()
})

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER')
    await AppDataSource.destroy()
})

describe("RecoveryUserController", () => {
    it('deve retornar 200 ao solicitar recuperação com email cadastrado', async () => {
        const response = await request(app).post('/usuario/recovery').send({
            email: "email@teste.com"
        })

        expect(response.status).toBe(200);
        expect(response.text).toBe('Solicitação enviada');
    })

    it('deve retornar 400 ao solicitar recuperação com email não cadastrado', async () => {
        const response = await request(app).post('/usuario/recovery').send({
            email: "emailNaoCadastrado@teste.com"
        })

        expect(response.status).toBe(400);
        expect(response.text).toBe('Usuario não encontrado');
    })
})

describe("RecoveryUserController validações email", () => {
    it('deve retornar 400 ao solicitar recuperação com email invalido', async () => {
        const response = await request(app).post('/usuario/recovery').send({
            email: "emailinvalidoteste.com"
        })

        expect(response.status).toBe(400);
        expect(response.text).toBe('Entre com e-mail válido');
    })

    it('deve retornar 400 ao solicitar sem informar email', async () => {
        const response = await request(app).post('/usuario/recovery').send({
        })

        expect(response.status).toBe(400);
        expect(response.text).toBe('Campo email é obrigatório');
    })
})