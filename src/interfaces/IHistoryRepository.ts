
import { History } from '../models/History/History';
import { TransactionType } from '@prisma/client';


export interface IHistoryRepository {

    /**
     * Log transaction
     * @param userId 
     * @param amount 
     * @param transactionType 
     * @returns The logged transaction
     */
    logTransaction(userId: string, amount: number, transactionType: TransactionType): Promise<History>;

    /**
     * Get history by user id
     * @param userId 
     * @returns The transaction history of a user
     */
    getHistoryByUserId(userId: string): Promise<History[]>;
}