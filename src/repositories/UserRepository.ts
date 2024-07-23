import { User } from '../models/User/User';
import { IUserRepository } from '../interfaces/IUserRepository';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export class UserRepository implements IUserRepository {

    async findById(id: string): Promise<User | null> {
        const user = await prisma.account.findFirst({ where: { id: id } })
        return user;
    }

    async save(user: User): Promise<User | null> {
        return await prisma.account.create({ data: user });
    }

    async delete(id: string): Promise<void> {
        await prisma.history.deleteMany({
            where: { userId: id }
        });

        await prisma.account.delete({ where: { id: id } });
    }

    async login(id: string): Promise<User | null> {
        // Check if the account exists
        const user = await prisma.account.findUnique({
            where: { id: id }
        });

        if (!user) {
            return null
        }

        // Update the lastLoginAt field if the account exists
        return await prisma.account.update({
            where: { id: id },
            data: { lastLoginAt: new Date() }
        });
    }

    async logout(id: string): Promise<User | null> {
        // Check if the account exists
        const user = await prisma.account.findUnique({
            where: { id: id }
        });

        if (!user) {
            return null
        }

        // Update the lastLogoutAt field if the account exists
        return await prisma.account.update({
            where: { id: id },
            data: { lastLogoutAt: new Date() }
        });
    }

    async cashout(id: string): Promise<User | null> {
        // Check if the account exists
        let user = await this.findById(id)
        if (!user) {
            return null
        }

        // Update the lastLogoutAt field if the account exists
        let updatedUser = await prisma.account.update({
            where: { id: id },
            data: { balance: 0 }
        });

        return updatedUser
    }

    async updateBalanceAfterRoll(id: string, amount: number): Promise<User | null> {
        // Check if the account exists
        let user = await this.findById(id)
        if (!user) {
            return null
        }

        let updatedBalance = user.balance + amount

        // Update the lastLogoutAt field if the account exists
        return await prisma.account.update({
            where: { id: id },
            data: { balance: updatedBalance }
        });
    }
}
