import * as bcrypt from 'bcryptjs';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';

interface IUsuario {
    username: string,
    senha: string
}

export class LoginUserService {
    async execute({ username, senha }: IUsuario) {

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ userName: username });

        if (!user) {
            throw new Error('username ou senha incorretos, tente novamente');
        }

        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            throw new Error("username ou senha incorretos, tente novamente");
        }

        return user.getUser();
    }
}