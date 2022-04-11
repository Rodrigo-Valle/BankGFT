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
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "1995-01-04"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data.id');
    });
});

describe('UserCreateController validacão campo nome', () => {
    it('Deve retornar 400 se não for informado campo nome', async () => {
        const response = await request(app).post('/usuario').send({
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo nome é obrigatório');
    });

    it('Deve retornar 400 se nome for menor a 3 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: 'Jo',
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nome deve possuir ao menos 3 caracteres');
    });

    it('Deve retornar 400 se nome for maior que 30 caracteres', async () => {
        const response = await request(app).post('/usuario').send({
            nome: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Donec sagittis felis sed sem auctor volutpat',
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Nome deve possuir no maximo 30 caracteres');
    });
});

describe('UserCreateController validação campo email', () => {
    it('Deve retornar 400 se não for informado campo email', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo email é obrigatório');
    });

    it('Deve retornar 400 se não for informado campo email válido', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "emailqualquer",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
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
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo senha é obrigatório');
    });

    it('Deve retornar 400 se for informado uma senha que possua letras', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "as345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });

    it('Deve retornar 400 se for informado uma senha que possua mais de 8 numeros', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "1234567890",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });

    it('Deve retornar 400 se for informado uma senha que possua menos de 8 numeros', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "123456",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A senha deve possuir 8 numeros');
    });
});

describe('UserCreateController validação campo username/descricao', () => {
    it('Deve retornar 400 se não informado campo username', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo username é obrigatório');
    });

    it('Deve retornar 400 se não informado campo descricao', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            celular: "11-98877-6655",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo descrição obrigatório');
    });
});

describe('UserCreateController validação celular', () => {
    
    it('Deve retornar 400 se não informado campo celular', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo celular obrigatório');
    })    
    it('Deve retornar 400 se for informado celular com menos de 9 numeros', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            celular: "11965478",
            descricao: "teste",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Celular é composto por no minimo 9 numeros');
    })    

    it('Deve retornar 400 se for informado celular com mais de 15 numeros', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            celular: "11 965478981236486",
            descricao: "teste",
            dataNasc: "01-01-2000"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Celular é composto por no maximo 15 numeros');
    })    
})

describe("UserCreateController validação data de nacimento", () => {
    it('Deve retornar 400 ao criar novo usuario sem o campo data de nascimento', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo data de nascimento é obrigatório');
    });

    it('Deve retornar 400 ao criar novo usuario sem o campo data de nascimento', async () => {
        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: "dataqualuer"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('O valor não corresponde a uma data valida');
    });

    it('Deve retornar 400 ao criar novo usuario com data de nascimento superior a data de hoje', async () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);

        const response = await request(app).post('/usuario').send({
            nome: "teste",
            email: "email2@teste.com",
            senha: "12345678",
            username: "teste",
            descricao: "teste",
            celular: "11-98877-6655",
            dataNasc: date
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A data não pode ser posterior a data de hoje');
    });
});
