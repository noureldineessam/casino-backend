import { User } from '../models/User/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IGameService } from '../interfaces/IGameService';
import { IHistoryRepository } from '../interfaces/IHistoryRepository';
import { PrismaClient, TransactionType } from '@prisma/client';


const prisma = new PrismaClient();


import { logger } from '../utils/logger';

export class HistoryService {
    constructor(
        private historyRepository: IHistoryRepository
    ) { }

    async logTransaction(userId: string, amount: number, transactionType: TransactionType): Promise<null> {
        try {
            logger.info('Logging transaction');
            await this.historyRepository.logTransaction(userId, amount, transactionType);

            return null;
        } catch (error: any) {
            logger.error('Error logging transaction', { message: error.message, stack: error.stack });
            throw new Error('Failed to log transaction');
        }
    }

    async getHistoryByUserId(userId: string): Promise<any> {
        try {
            logger.info('Fetching history');
            const history = await this.historyRepository.getHistoryByUserId(userId);
            return history;
        } catch (error: any) {
            logger.error('Error fetching history', { message: error.message, stack: error.stack });
            throw new Error('Failed to fetch history');
        }
    }
}
