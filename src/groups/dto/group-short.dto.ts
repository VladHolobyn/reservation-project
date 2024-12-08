import { Expose, instanceToInstance, plainToInstance, Transform, Type } from "class-transformer";
import { UserDto } from "src/auth/dto/user.dto";

export class GroupShortDto {    
    
    @Expose()name: string
    
    @Expose() description: string

    @Type(()=> UserDto)
    @Expose() owner:UserDto
}