import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import * as bcrypt from 'bcryptjs';

interface IUsuario {
    nome: string,
    email: string,
    senha: string
}

export class CreateUserService {
    async execute({ nome, email, senha }: IUsuario) {
        const user = new User();
        user.nome = nome;
        user.email = email;
        user.senha = await bcrypt.hash(senha, 8);

        const usuarioRepository = AppDataSource.getRepository(User);

        await usuarioRepository.save(user);

        return user;
    }
}