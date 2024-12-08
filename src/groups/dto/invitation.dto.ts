import { Expose, Type } from "class-transformer";
import { UserDto } from "src/auth/dto/user.dto";
import { GroupShortDto } from "./group-short.dto";
import { Timestamp } from "typeorm";
import { MembershipState } from "../entity/membership-state.enum";

export class InvitationDto {
    @Expose() id: number

    @Type(()=> UserDto)
    @Expose() user: UserDto

    @Type(()=> GroupShortDto)
    @Expose() group: GroupShortDto

    @Expose() state: MembershipState

    @Expose() created: Timestamp
}