import { User } from '../User';

export class UserDetailsDTO {
  id: string;
  name: string;
  balance: number;
  bankAccount: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
  lastLogoutAt: Date;
  lastCashoutAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.balance = user.balance;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.lastLoginAt = user.lastLoginAt;
    this.lastLogoutAt = user.lastLogoutAt;
    this.bankAccount = user.bankAccount;
    this.lastCashoutAt = user.lastCashoutAt;
  }
}