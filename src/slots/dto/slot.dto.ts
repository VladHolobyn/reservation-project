import { Expose, Transform, Type } from "class-transformer"
import { SlotState } from "../entity/slot-state.enum"
import { UserDto } from "src/auth/dto/user.dto"
import { User } from "src/auth/entities/user.entity"
import { Group } from "src/groups/entity/group.entity"
import { GroupShortDto } from "src/groups/dto/group-short.dto"

export class SlotDto {

    @Expose() id: number

    @Expose() startDate: Date

    @Expose() endDate: Date

    @Transform(({value})=> SlotState[value])
    @Expose() state: SlotState

    @Type(()=>UserDto)
    @Expose() owner: User

    @Type(()=>UserDto)
    @Expose() reserver: User | null


    @Type(()=>GroupShortDto)
    @Expose() group: Group

}
