import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"

@Entity()
export class CoOwner {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nome: string

    @Column()
    email: string

    @Column('date')
    data_nasc: string

    @Column()
    celular: string

    @Column()
    descricao: string

    @ManyToOne(() => User, (user) => user.id)
    usuario: User
}