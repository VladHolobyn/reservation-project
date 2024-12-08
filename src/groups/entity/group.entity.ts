import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    ownerId: number

    @ManyToOne(()=>User, (table) => table.id)
    @JoinColumn()
    owner: User

    constructor(group: Partial<Group>) {
        Object.assign(this, group);
    }
}
