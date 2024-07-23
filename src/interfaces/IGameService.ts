
/**
 * Interface representing a repository for `Game` entities.
 */
export interface IGameService {
    /**
     * Roll the dice
     * @param id - The ID of the user to roll.
     * @returns The user after the roll and the roll result
     * @throws Error if the roll fails
    */
    roll(id: string): Promise<any>;
}
