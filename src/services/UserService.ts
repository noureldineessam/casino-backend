import { User } from '../models/User/User';
import { History } from '../models/History/History';

import { IUserRepository } from '../interfaces/IUserRepository';

import { UserSummaryDTO } from '../models/User/dto/UserSummaryDTO';
import { UserDetailsDTO } from '../models/User/dto/UserDetailsDTO';

import { HistoryRepository } from '../repositories/HistoryRepository';
import { HistoryService } from '../services/HistoryService';

import { PrismaClient, TransactionType } from '@prisma/client';

import { logger } from '../utils/logger';

const prisma = new PrismaClient();

export class UserService {
    constructor(
        private userRepository: IUserRepository
    ) { }

    private historyService = new HistoryService(new HistoryRepository());

    private async sendToBankAccount(id: string) { }

    /**
     * Retrieves a user by ID and returns it as UserDetailsDTO.
     * @param id - The ID of the user.
     * @returns {Promise<UserDetailsDTO | null>} The user details or null if not found.
     */
    async getUserById(id: string): Promise<UserDetailsDTO | null> {
        try {
            logger.info('Fetching user by ID', { id: id });
            const user = await this.userRepository.findById(id);
            if (user) {
                return new UserDetailsDTO(user);
            }
            return null;
        } catch (error: any) {
            logger.error('Error retrieving user by ID', { message: error.message, stack: error.stack });
            throw new Error(`Failed to retrieve user: ${error.message}`);
        }
    }

    /**
     * Saves a new user and returns the saved user.
     * @param user - The user to be saved.
     * @returns {Promise<UserDetailsDTO | null>} The saved user details or null if not saved.
     */
    async saveUser(user: User): Promise<User | null> {
        try {
            logger.info('Creating a new user', { user: user });
            const { id, ...userWithoutId } = user;

            let savedUser = await this.userRepository.save(userWithoutId as User) as User;
            await this.userRepository.login(savedUser.id);


            return savedUser;
        } catch (error: any) {
            logger.error('Error creating user', { message: error.message, stack: error.stack });
            throw new Error('Failed to create user');
        }
    }

    /**
     * Deletes a user by ID.
     * @param id - The ID of the user to be deleted.
     */
    async deleteUser(id: string): Promise<Boolean> {
        try {
            logger.info('Deleting user', { id: id.toString() });

            const user = await this.userRepository.findById(id);

            if (user) {
                await this.userRepository.delete(id);
                return true;
            }

            return false;
        } catch (error: any) {
            logger.error('Error deleting user', { message: error.message, stack: error.stack });
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }


    /**
     * Logs in a user by ID.
     * @param id - The ID of the user to be logged in.
     */
    async loginUser(id: string): Promise<UserSummaryDTO | null> {
        try {
            logger.info('Logging in user', { id: id });
            return await this.userRepository.login(id);
        } catch (error: any) {
            logger.error('Error logging in user', { message: error.message, stack: error.stack });
            throw new Error(`Failed to login user: ${error.message}`);
        }
    }

    /**
     * Logs out a user by ID.
     * @param id - The ID of the user to be logged out.
     */
    async logoutUser(id: string): Promise<UserSummaryDTO | null> {
        try {
            logger.info('Logging out user', { id: id });
            return await this.userRepository.logout(id);
        } catch (error: any) {
            logger.error('Error logging out user', { message: error.message, stack: error.stack });
            throw new Error(`Failed to logout user: ${error.message}`);
        }
    }

    /**
     * Chashout from user balance.
     * @param id - The ID of the user to cashout.
     * @returns {Promise<Number | null>} The updated balance, null if not found, -1 if amountToCashout is less than balance.
     */
    async cashoutUser(id: string): Promise<Number | null> {
        try {
            logger.info('Cashing out user', { id: id });
            const user = await this.userRepository.findById(id);
            if (!user) {
                return null;
            }

            let canCashout: boolean = user.balance > 0;

            if (canCashout) {

                let cashoutUser = await prisma.$transaction(async () => {
                    let canCashoutUser = await this.userRepository.cashout(id);
                    await this.historyService.logTransaction(user.id, (-user.balance), TransactionType.CASHOUT);
                    // TODO: Implement sendToBankAccount
                    await this.sendToBankAccount(id);
                    await this.userRepository.logout(id);
                    return canCashoutUser
                })
                return cashoutUser?.balance as Number;

            } else {
                return -1
            }
        } catch (error: any) {
            logger.error('Error cashing out user', { message: error.message, stack: error.stack });
            throw new Error(`Failed to cashout user: ${error.message}`);
        }
    }

    /**
     * Update balance after roll.
     * @param id - The ID of the user to deposit.
     * @param amount - The amount.
     * @returns {Promise<UserSummaryDTO | null>} The updated balance, null if not found.
     */
    async updateBalanceAfterRoll(id: string, amount: number): Promise<UserSummaryDTO | null> {
        try {
            logger.info('Depositing user', { id: id });
            return await this.userRepository.updateBalanceAfterRoll(id, amount);
        } catch (error: any) {
            logger.error('Error depositing user', { message: error.message, stack: error.stack });
            throw new Error(`Failed to deposit user: ${error.message}`);
        }
    }

    /**
     * Get User History.
     * @param id - The ID of the user.
     * @returns {Promise<History[]>} The user history.
     */
    async getHistoryByUserId(id: string): Promise<History[]> {
        try {
            logger.info('Fetching user history', { id: id });
            return await this.historyService.getHistoryByUserId(id);
        } catch (error: any) {
            logger.error('Error fetching user history', { message: error.message, stack: error.stack });
            throw new Error(`Failed to fetch user history: ${error.message}`);
        }
    }
}
