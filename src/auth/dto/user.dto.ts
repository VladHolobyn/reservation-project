import { User } from "../entities/user.entity";

export class UserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;

    constructor(user: Partial<User>) {
        Object.assign(this, user);
    }
}
