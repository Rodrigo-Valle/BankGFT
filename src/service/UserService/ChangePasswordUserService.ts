import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import * as bcrypt from 'bcryptjs';

export class ChangePasswordUserService {
    async execute({ email, senha, codigo }) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email: email });
        
        if (!user) {
            throw new Error('Usuario não localizado');
        }

        if (user.codigo_reset !== codigo) {
            throw new Error("código de recuperação inválido");
        }

        user.senha = await bcrypt.hash(senha, 8);
        user.codigo_reset = " ";

        await userRepository.save(user);
    }
}