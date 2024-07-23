import { GameService } from '../services/GameService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { User } from '../models/User/User';
import { UserService } from '../services/UserService';
import { HistoryService } from '../services/HistoryService';
import { TransactionType } from '@prisma/client';

const mockUserRepository: Partial<IUserRepository> = {
    findById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    cashout: jest.fn(),
    updateBalanceAfterRoll: jest.fn(),
};

const mockHistoryService: Partial<HistoryService> = {
    logTransaction: jest.fn(),
};

const mockUserService: Partial<UserService> = {
    getUserById: jest.fn(),
    updateBalanceAfterRoll: jest.fn(),
};

const createMockUser = (balance: number): User => {
    const user = new User();
    user.id = "123";
    user.name = 'Test User';
    user.bankAccount = '123456';
    user.balance = balance;
    return user;
};

describe('GameService', () => {
    let gameService: GameService;

    beforeEach(() => {
        gameService = new GameService(
            mockUserRepository as IUserRepository,
            mockHistoryService as HistoryService,
            mockUserService as UserService
        );
    });

    it('should roll slots and update user balance when no win', async () => {
        const user = createMockUser(100);

        (mockUserService.getUserById as jest.Mock).mockResolvedValue(user);
        (mockUserService.updateBalanceAfterRoll as jest.Mock).mockResolvedValue(user);
        (mockHistoryService.logTransaction as jest.Mock).mockResolvedValue({} as any);

        jest.spyOn(gameService as any, 'generateRandomSymbols').mockReturnValue(['L', 'O', 'L']);
        jest.spyOn(gameService as any, 'isWinningRoll').mockReturnValue(false);

        const result = await gameService.roll(user.id);

        expect(result).toHaveProperty('userAfterRoll');
        expect(result).toHaveProperty('rollResult');
        expect(mockUserService.updateBalanceAfterRoll).toHaveBeenCalledWith(user.id, expect.any(Number));
        expect(mockHistoryService.logTransaction).toHaveBeenCalledWith(user.id, -1, TransactionType.ROLL);
        expect(mockHistoryService.logTransaction).not.toHaveBeenCalledWith(user.id, expect.any(Number), TransactionType.WIN);
    });

    it('should return null if user balance is zero', async () => {
        const user = createMockUser(0);

        (mockUserService.getUserById as jest.Mock).mockResolvedValue(user);

        const result = await gameService.roll(user.id);

        expect(result).toBeNull();

    });

    it('should handle rolls', async () => {
        const user = createMockUser(10);
        (mockUserService.getUserById as jest.Mock).mockResolvedValue(user);
        (mockUserService.updateBalanceAfterRoll as jest.Mock).mockResolvedValue(user);
        (mockHistoryService.logTransaction as jest.Mock).mockResolvedValue({} as any);

        jest.spyOn(gameService as any, 'generateRandomSymbols')
            .mockReturnValueOnce(['C', 'C', 'L'])

        jest.spyOn(gameService as any, 'isWinningRoll')
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true);

        (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);
        jest.spyOn(gameService as any, 'shouldReRoll').mockResolvedValue(true);

        const result = await gameService.roll(user.id);

        expect(result).toHaveProperty('userAfterRoll');
        expect(result.rollResult).toEqual(['C', 'C', 'L']);
    });
});
