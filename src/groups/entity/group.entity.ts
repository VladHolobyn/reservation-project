import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GroupMember } from "./group-member.entity";

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

    @OneToMany(()=>GroupMember, (table) => table.group)
    members: GroupMember[]

    constructor(group: Partial<Group>) {
        Object.assign(this, group);
    }
}
