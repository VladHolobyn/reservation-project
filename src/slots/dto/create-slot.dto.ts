import { IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreateSlotDto {

    @IsDateString()
    @IsOptional()
    startDate: Date

    @IsDateString()
    @IsOptional()
    endDate: Date

    
    @IsNumber()
    @IsOptional()
    groupId: number

    @IsNumber()
    @IsOptional()
    reserverId: number | null

}
