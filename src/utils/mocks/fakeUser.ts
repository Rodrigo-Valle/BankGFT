import { AppDataSource } from "../../data-source";
import * as bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { v4 as uuid } from 'uuid';

export const fakeUser = {
    async createUser() {
        const userRepository = await AppDataSource.getRepository(User);
        const user = new User();
        user.nome = 'teste'
        user.email = 'email@teste.com'
        user.senha = await bcrypt.hash('12345678', 8);
        user.userName = 'teste';
        user.celular = '11999887766';
        user.data_nasc = new Date('01-01-2000');
        user.descricao = 'teste'

        await userRepository.save(user);
    },

    async createUserAndGenerateToken() {
        const userRepository = await AppDataSource.getRepository(User);
        const user = new User();
        user.nome = 'teste'
        user.email = 'email@teste.com'
        user.senha = await bcrypt.hash('12345678', 8);
        user.userName = 'teste';
        user.celular = '11999887766';
        user.data_nasc = new Date('01-01-2000');
        user.descricao = 'teste'

        await userRepository.save(user);

        const token = await user.generateAuthToken();

        return { token, user }
    },

    async createUserWithCode() {
        const userRepository = await AppDataSource.getRepository(User);

        const codigo = uuid();
        const user = new User();
        user.nome = 'teste'
        user.email = 'email@teste.com'
        user.senha = await bcrypt.hash('12345678', 8);
        user.userName = 'teste';
        user.celular = '11999887766';
        user.data_nasc = new Date('01-01-2000');
        user.descricao = 'teste'
        user.codigo_reset = codigo

        await userRepository.save(user);

        return codigo;
    }
}