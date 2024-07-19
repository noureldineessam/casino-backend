import { User } from '../User';

export class UserSummaryDTO {
    id: string;
    name: string;
    balance: number;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.balance = user.balance;
    }
}