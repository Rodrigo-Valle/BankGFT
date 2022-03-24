import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import * as jwt from 'jsonwebtoken'

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column({
        unique: true
    })
    email: string

    @Column()
    senha: string
    
    @Column({
        nullable: true
    })
    codigo_reset: string


    generateAuthToken = async function () {
        const usuario = this

        const token = await jwt.sign({ id: usuario.id }, 'tokenbank', { expiresIn: '1 day' });
        return token;
    }

    getUsuario = function () {
        const usuario = this

        delete usuario.senha;
        delete usuario.codigo_reset;

        return usuario;
    }


}
