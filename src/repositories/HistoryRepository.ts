import { PrismaClient, TransactionType } from '@prisma/client';
import { IHistoryRepository } from '../interfaces/IHistoryRepository';
import { History } from '../models/History/History';


const prisma = new PrismaClient();

export class HistoryRepository implements IHistoryRepository {
    async logTransaction(userId: string, amount: number, transactionType: TransactionType): Promise<History> {
        return prisma.history.create({
            data: {
                userId,
                amount,
                transactionType,
            },
        });
    }

    async getHistoryByUserId(userId: string): Promise<History[]> {
        return await prisma.history.findMany({
            where: { userId },
            orderBy: { timestamp: 'desc' },
        });
    }
}