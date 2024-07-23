import { IHistoryRepository } from '../interfaces/IHistoryRepository';
import { PrismaClient, TransactionType } from '@prisma/client';



import { logger } from '../utils/logger';

export class HistoryService {
    constructor(
        private historyRepository: IHistoryRepository
    ) { }

    /**
     * Logs a transaction for the user with the given ID.
     * @param userId - The ID of the user.
     * @param amount - The amount of the transaction.
     * @param transactionType - The type of the transaction.
     * @returns {Promise<null>}.
     */
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

    /**
     * Retrieves the history for the user with the given ID.
     * @param userId - The ID of the user.
     * @returns {Promise<any>}.
     */
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
