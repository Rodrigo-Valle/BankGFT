import * as bcrypt from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

interface IUsuario {
    email: string,
    senha: string
}

export class LoginUserService {
    async execute({ email, senha }: IUsuario) {

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email: email });

        if (!user) {
            throw new Error('email ou senha incorretos, tente novamente');
        }

        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            throw new Error("email ou senha incorretos, tente novamente");
        }

        return user.getUser();
    }
}