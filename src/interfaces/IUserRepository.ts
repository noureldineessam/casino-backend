import { User } from '../models/User/User';

/**
 * Interface representing a repository for `User` entities.
 */
export interface IUserRepository {

    /**
     * Retrieves a user by its ID.
     * @param id - The ID of the user to retrieve.
     */
    findById(id: string): Promise<User | null>;

    /**
     * Saves a new user to the repository.
     * @param user - The user object to save.
     */
    save(user: User): Promise<User | null>;


    /**
     * Deletes a user from the repository by its ID.
     * @param id - The ID of the user to delete.
     */
    delete(id: string): Promise<void>;

    /**
     * Login a user from the repository by its ID.
     * @param id - The ID of the user to login.
     */
    login(id: string): Promise<User | null>;

    /**
     * Logout a user from the repository by its ID.
     * @param id - The ID of the user to logout.
     */
    logout(id: string): Promise<User | null>;

    /**
     * Chashout from user balance.
     * @param id - The ID of the user to logout.
     */
    cashout(id: string): Promise<User | null>;

    /**
     * Update balance to user.
     * @param id - The ID of the user to logout.
     * @param amount - The amount to update.
     */
    updateBalanceAfterRoll(id: string, amount: number): Promise<User | null>;

}
