import { IsNumber, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class RequestSlotDto {

    @IsString()
    startDate: Timestamp

    @IsString()
    endDate: Timestamp

    @IsNumber()
    groupId: number

    reserverId: number

}
