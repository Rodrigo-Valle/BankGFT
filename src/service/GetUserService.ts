import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";


export class GetUserService {
    async execute(id: number) {
        const usuarioRepository = AppDataSource.getRepository(Usuario);

        const usuario = await usuarioRepository.findOneBy({ id: id });

        if (!usuario) {
            throw new Error("Usuario não encontrado");
        }

        return usuario.getUsuario();
    }
}