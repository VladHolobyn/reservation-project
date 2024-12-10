import { Expose } from "class-transformer";
import { User } from "../entities/user.entity";

export class UserDto {
    @Expose() id: number;
    @Expose() email: string;
    @Expose() firstName: string;
    @Expose() lastName: string;

    constructor(user: Partial<User>) {
        if (user) {
            this.id = user.id;
            this.email = user.email;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
        }
    }
}
