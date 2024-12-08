import { Expose, Type } from "class-transformer"
import { MemberDto } from "./member.dto"

export class GroupFullDto {
    
    @Expose() name: string
    
    @Expose() description: string

    @Type(()=> MemberDto)
    @Expose() members: MemberDto[]
}