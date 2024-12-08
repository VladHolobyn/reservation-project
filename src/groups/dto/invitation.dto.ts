import { IsNumber } from "class-validator"

export class InvitationDto {
    
    @IsNumber()
    userId: number

    @IsNumber()
    groupId: number
}