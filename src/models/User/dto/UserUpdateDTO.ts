import { User } from '../User';

export class UserUpdateDTO {
    id: string;
    name: string;
    updatedAt: Date;


    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.updatedAt = user.updatedAt
    }
}