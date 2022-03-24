import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import * as bcrypt from 'bcryptjs';


interface IUsuario {
    email: string,
    senha: string
}

export class LoginUserService {
    async execute({ email, senha }: IUsuario) {

        const usuarioRepository = AppDataSource.getRepository(Usuario);

        const usuario = await usuarioRepository.findOneBy({ email: email });

        if (!usuario) {
            throw new Error('email ou senha incorretos, tente novamente');
        }

        const isMatch = await bcrypt.compare(senha, usuario.senha);

        if (!isMatch) {
            throw new Error("email ou senha incorretos, tente novamente");
        }

        return usuario.getUsuario();
    }
}