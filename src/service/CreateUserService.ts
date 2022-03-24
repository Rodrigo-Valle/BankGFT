import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario"
import * as bcrypt from 'bcryptjs';


interface IUsuario {
    nome: string,
    email: string,
    senha: string
}

export class CreateUserService {
    async execute({ nome, email, senha }: IUsuario) {
        const usuario = new Usuario();
        usuario.nome = nome;
        usuario.email = email;
        usuario.senha = await bcrypt.hash(senha, 8);

        const usuarioRepository = AppDataSource.getRepository(Usuario);

        await usuarioRepository.save(usuario);

        return usuario;
    }
}