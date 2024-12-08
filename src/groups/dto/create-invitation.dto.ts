import { IsNumber } from "class-validator"

export class CreateInvitationDto {
    
    @IsNumber()
    userId: number

    @IsNumber()
    groupId: number
}