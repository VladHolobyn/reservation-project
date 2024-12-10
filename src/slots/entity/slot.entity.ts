import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { SlotState } from "./slot-state.enum";
import { Group } from "src/groups/entity/group.entity";

@Entity()
export class Slot {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'timestamptz' })
    startDate: Timestamp

    @Column({ type: 'timestamptz' })
    endDate: Timestamp

    @Column({
        type: "enum",
        enum: SlotState,
        default: SlotState.DRAFT
    })
    state: SlotState


    @Column()
    ownerId: number

    @ManyToOne(()=>User, (table) => table.id)
    @JoinColumn()
    owner: User


    @Column({nullable: true})
    reserverId: number | null
    
    @ManyToOne(()=>User, (table) => table.id, {nullable: true})
    @JoinColumn()
    reserver?: User | null


    @Column()
    groupId: number

    @ManyToOne(()=>Group, (table) => table.id)
    @JoinColumn()
    group: Group

}
