import 'reflect-metadata';
import 'dotenv/config';
import request from 'supertest';
import { app } from '../../../app';
import { AppDataSource } from '../../../data-source';
import { fakeUser } from '../../../utils/mocks/fakeUser';

var token;

beforeAll(async () => {
    await AppDataSource.initialize().then(() => {
    }).catch((e) => {
        console.log(e);
    });

    const result = await fakeUser.createUserAndGenerateToken();
    token = result.token;
});

afterAll(async () => {
    await AppDataSource.query('DELETE FROM USER');
    await AppDataSource.destroy();
});

describe("CreateCoOwnerController Tests", () => {
    afterEach(async () => {
        await AppDataSource.query('DELETE FROM CO_OWNER');
    });

    it('Deve retornar 201 ao criar novo co-participante para usuario autenticado', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "teste@email.com",
            dataNasc: "1995-02-19",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"
        });

        expect(response.status).toBe(201);
    })

    it('Deve retornar 401 ao criar novo co-participante para usuario não autenticado', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', ``).send({
            nome: "teste",
            email: "teste@email.com",
            dataNasc: "1995-02-19",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"
        })

        expect(response.status).toBe(401);
    });
});

describe("CreateCoOwnerController validações nome", () => {
    it('Deve retornar 400 ao criar novo co-participante sem informar campo nome', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            email: "teste@email.com",
            dataNasc: "1995-02-19",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Campo nome é obrigatório");
    });

    it('Deve retornar 400 ao criar novo co-participante com nome com  menos de 3 caracteres', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: 'jo',
            email: "teste@email.com",
            dataNasc: "1995-02-19",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Nome deve possuir ao menos 3 caracteres");
    });

    it('Deve retornar 400 ao criar novo co-participante com nome com mais de 30 caracteres', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: 'Lorem ipsum dolor sit amet consectetur adipiscing elit Donec sagittis felis sed sem auctor volutpat',
            email: "teste@email.com",
            dataNasc: "1995-02-19",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Nome deve possuir no maximo 30 caracteres");
    });
});

describe("CreateCoOwnerController validações email", () => {
    it('Deve retornar 400 ao criar novo co-participante sem o campo email', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            dataNasc: "1995-02-19",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo email é obrigatório');
    });

    it('Deve retornar 400 ao criar novo co-participante com valor inválido para o campo email', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "testeemailinvalido.com",
            dataNasc: "1995-02-19",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Entre com e-mail válido');
    });
});

describe("CreateCoOwnerController validações data de nacimento", () => {
    it('Deve retornar 400 ao criar novo co-participante sem o campo data de nascimento', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "teste@email.com",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo data de nascimento é obrigatório');
    });

    it('Deve retornar 400 ao criar novo co-participante com valor inválido para o campo data de nascimento', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "teste@email.com",
            dataNasc: "99-99-9999",
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('O valor não corresponde a uma data valida');
    });

    it('Deve retornar 400 ao criar novo co-participante com data de nascimento superior a data de hoje', async () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);

        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "teste@email.com",
            dataNasc: date,
            celular: "999887766",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A data não pode ser posterior a data de hoje');
    });
});

describe("CreateCoOwnerController validações campo celular", () => {
    it('Deve retornar 400 ao criar novo co-participante sem o campo celular', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "teste@email.com",
            dataNasc: '1995-01-04',
            descricao: "teste coowner",
            cpf: "12345678901"
        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo celular obrigatório');
    });

    it('Deve retornar 400 ao criar novo co-participante com valor superior a 15 numeros para o campo celular', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "teste@email.com",
            dataNasc: '1995-02-19',
            celular: "99988776691234567",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Celular é composto por no maximo 15 numeros');
    });

    it('Deve retornar 400 ao criar novo co-participante com valor inferior a 9 numeros para o campo celular', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "teste@email.com",
            dataNasc: '1995-02-19',
            celular: "99988779",
            descricao: "teste coowner",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Celular é composto por no minimo 9 numeros');
    });
});

describe("CreateCoOwnerController validações campo descricao", () => {
    it('Deve retornar 400 ao criar novo co-participante sem o campo descricao', async () => {
        const response = await request(app).post('/co-titular').set('Authorization', `Bearer ${token}`).send({
            nome: "teste",
            email: "teste@email.com",
            dataNasc: '02-19-1995',
            celular: "999887769",
            cpf: "12345678901"

        });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Campo descrição obrigatório');
    });
});