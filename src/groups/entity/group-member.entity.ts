import { User } from "src/auth/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm"
import { Group } from "./group.entity"
import { MembershipState } from "./membership-state.enum"

@Entity()
export class GroupMember {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>User, (table) => table.id)
    @JoinColumn()
    user: User

    @Column()
    userId: number

    @ManyToOne(()=>Group, (table) => table.id)
    @JoinColumn()
    group: Group

    @Column()
    groupId: number

    @Column({
        type: "enum",
        enum: MembershipState,
        default: MembershipState.INVITED
    })
    state: MembershipState

    @CreateDateColumn()
    created: Timestamp




    constructor(group: Partial<Group>) {
        Object.assign(this, group);
    }
}