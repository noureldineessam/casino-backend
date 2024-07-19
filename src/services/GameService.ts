import { User } from '../models/User/User';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IGameService } from '../interfaces/IGameService';
import { IHistoryRepository } from '../interfaces/IHistoryRepository';
import { PrismaClient, TransactionType } from '@prisma/client';
import { HistoryService } from '../services/HistoryService';
import { UserRepository } from '../repositories/UserRepository';
import { UserService } from '../services/UserService';

import { HistoryRepository } from '../repositories/HistoryRepository';



const prisma = new PrismaClient();


import { logger } from '../utils/logger';

export class GameService implements IGameService {
    constructor(
        private userRepository: IUserRepository,
        private historyService: HistoryService,
        private userService: UserService
    ) { }

    // private historyService = new HistoryService(new HistoryRepository());
    // private userService = new UserService(new UserRepository());

    /**
     * Retrieves all users and returns them as UserSummaryDTO.
     * @returns {Promise<any>}.
     */
    async roll(id: string): Promise<any> {
        try {
            logger.info('Rolling slots');
            const user = await this.userService.getUserById(id) as User
            if (user.balance <= 0) {
                return null;
            }

            const rollResult = await this.rollSlots(user.id);
            const isWin = this.isWinningRoll(rollResult);
            const reward = isWin ? this.getReward(rollResult[0]) : 0;
            const rollCost = -1;
            const netAmount = reward + rollCost; // reward + (-1)

            const userAfterRoll = await prisma.$transaction(async () => {
                // Update user balance
                const updatedUser = await this.userService.updateBalanceAfterRoll(user.id, netAmount);

                // Log the roll cost
                await this.historyService.logTransaction(user.id, rollCost, TransactionType.ROLL);

                // Log the reward if it's a win
                if (isWin) {
                    await this.historyService.logTransaction(user.id, reward, TransactionType.WIN);
                }

                return updatedUser;
            });

            return { userAfterRoll, rollResult };
        } catch (error: any) {
            logger.error('Error rolling slots', { message: error.message, stack: error.stack });
            throw new Error('Failed to roll');
        }
    }


    private symbols = ['C', 'L', 'O', 'W'];

    private getReward = (symbol: string): number => {
        switch (symbol) {
            case 'C': return 10;
            case 'L': return 20;
            case 'O': return 30;
            case 'W': return 40;
            default: return 0;
        }
    };

    private generateRandomSymbols = (): string[] => {
        return [
            this.symbols[Math.floor(Math.random() * 4)],
            this.symbols[Math.floor(Math.random() * 4)],
            this.symbols[Math.floor(Math.random() * 4)]
        ];
    };

    private isWinningRoll(result: string[]): boolean {
        return result[0] === result[1] && result[0] === result[2];
    }

    private async rollSlots(id: string): Promise<string[]> {
        let result = this.generateRandomSymbols();
        if (this.isWinningRoll(result)) {
            let shouldReRoll = await this.shouldReRoll(id, result)
            if (shouldReRoll) {
                result = this.generateRandomSymbols();
            }
        }

        return result;
    }

    private async shouldReRoll(id: string, result: string[]): Promise<boolean> {
        const user = await this.userRepository.findById(id) as User;
        const randomInt = Math.floor(Math.random() * 10); // Generates a random integer between 0 and 9
        if (user.balance >= 60) {
            return randomInt < 6; // 60% chance
        } else if (user.balance >= 40) {
            return randomInt < 3; // 30% chance
        }
        return false;
    }

}
