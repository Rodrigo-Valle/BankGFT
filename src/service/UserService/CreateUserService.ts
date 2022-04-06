import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import * as bcrypt from 'bcryptjs';

interface IUsuario {
    nome: string,
    email: string,
    senha: string,
    celular: string,
    username: string,
    descricao: string,
    dataNasc: string
}

export class CreateUserService {
    async execute({ nome, email, senha, celular, username, descricao, dataNasc }: IUsuario) {
        const user = new User();
        user.nome = nome;
        user.email = email;
        user.senha = await bcrypt.hash(senha, 8);
        user.celular = celular;
        user.descricao = descricao;
        user.userName = username;
        user.data_nasc = new Date(dataNasc)

        const usuarioRepository = AppDataSource.getRepository(User);

        await usuarioRepository.save(user);

        return user;
    }
}