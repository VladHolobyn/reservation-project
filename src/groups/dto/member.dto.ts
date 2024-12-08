import { Expose, Type } from "class-transformer";
import { UserDto } from "src/auth/dto/user.dto";
import { MembershipState } from "../entity/membership-state.enum";
import { Timestamp } from "typeorm";

export class MemberDto {

    @Type(()=> UserDto)
    @Expose() user: UserDto

    @Expose() state: MembershipState

    @Expose() created: Timestamp
}