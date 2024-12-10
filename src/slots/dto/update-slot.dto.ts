import { IsDateString, IsNumber, IsOptional } from "class-validator";


export class UpdateSlotDto {

    @IsDateString()
    @IsOptional()
    startDate: Date| null

    @IsDateString()
    @IsOptional()
    endDate: Date| null

    @IsNumber()
    @IsOptional()
    groupId: number| null

    @IsNumber()
    @IsOptional()
    reserverId: number | null

}
