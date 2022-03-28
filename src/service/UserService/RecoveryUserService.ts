import { v4 as uuid } from 'uuid';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import * as sendEmail from '../../utils/sendEmail';

export class RecoveryUserService {
    async execute(email: string) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email: email });

        if (!user) {
            throw new Error('Usuario não encontrado');
        }

        const codigo = uuid();

        user.codigo_reset = codigo;

        await userRepository.save(user);

        sendEmail.execute(user.codigo_reset, user.email);
    }
}