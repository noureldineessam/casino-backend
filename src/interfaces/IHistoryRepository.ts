
import { History } from '../models/History/History';
import { PrismaClient, TransactionType } from '@prisma/client';


export interface IHistoryRepository {
    logTransaction(userId: string, amount: number, transactionType: TransactionType): Promise<History>;
    getHistoryByUserId(userId: string): Promise<History[]>;
}