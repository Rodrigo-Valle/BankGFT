import { AppDataSource } from "../../data-source";
import * as bcrypt from 'bcryptjs';
import { User } from "../../entity/User";
import { v4 as uuid } from 'uuid';


export const fakeUser = {
    async createUser() {
        const userRepository = await AppDataSource.getRepository(User);
        const user = new User();
        user.nome = 'teste'
        user.email = 'email@teste.com'
        user.senha = await bcrypt.hash('Abc12345', 8);
    
        await userRepository.save(user);
    },

    async createUserAndGenerateToken() {
        const userRepository = await AppDataSource.getRepository(User);
        const user = new User();
        user.nome = 'teste'
        user.email = 'email@teste.com'
        user.senha = await bcrypt.hash('Abc12345', 8);
    
        await userRepository.save(user);
        
        const token = await user.generateAuthToken();

        return {token, user}
    },

    async createUserWithCode() {
        const userRepository = await AppDataSource.getRepository(User);

        const codigo = uuid();
        const user = new User();
        user.nome = 'teste'
        user.email = 'email@teste.com'
        user.senha = await bcrypt.hash('Abc12345', 8);
        user.codigo_reset = codigo
    
        await userRepository.save(user);
        
        return codigo;
    }
}


