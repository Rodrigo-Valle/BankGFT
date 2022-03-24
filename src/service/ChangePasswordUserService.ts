import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import * as bcrypt from 'bcryptjs';


export class ChangePasswordUserService {
    async execute({ email, senha, codigo }) {
        const usuarioRepository = AppDataSource.getRepository(Usuario);

        const usuario = await usuarioRepository.findOneBy({ email: email });
        console.log(usuario);
        if (!usuario) {
            throw new Error('Usuario não localizado');
        }

        if (usuario.codigo_reset !== codigo) {
            throw new Error("código de recuperação inválido");
        }

        usuario.senha = await bcrypt.hash(senha, 8);
        usuario.codigo_reset = " ";

        console.log(usuario);
        await usuarioRepository.save(usuario);
    }
}