import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import * as sendEmail from '../utils/sendEmail';
import { v4 as uuid } from 'uuid';


export class RecoveryUserService {
    async execute(email: string) {
        const usuarioRepository = AppDataSource.getRepository(Usuario);

        const usuario = await usuarioRepository.findOneBy({ email: email });

        if (!usuario) {
            throw new Error('Usuario não encontrado');
        }

        const codigo = uuid();

        usuario.codigo_reset = codigo;

        await usuarioRepository.save(usuario);

        sendEmail.execute(usuario.codigo_reset, usuario.email);
    }
}