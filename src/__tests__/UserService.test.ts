import { UserService } from '../services/UserService';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IHistoryRepository } from '../interfaces/IHistoryRepository';
import { TransactionType } from '@prisma/client';


import { User } from '../models/User/User';
import { UserDetailsDTO } from '../models/User/dto/UserDetailsDTO';

const mockUserRepository: IUserRepository = {
    findById: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    login: jest.fn(),
    logout: jest.fn(),
    cashout: jest.fn(),
    updateBalanceAfterRoll: jest.fn(),
};

const mockHistoryRepository: IHistoryRepository = {
    logTransaction: jest.fn(),
    getHistoryByUserId: jest.fn(),
};

const createMockUserNoBalance = () => {
    const user = new User();
    user.id = "1";
    user.name = 'Fluffy';
    user.balance = 0;

    return user;
}


describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService(mockUserRepository);
    });


    it('should retrieve a user by ID', async () => {
        const user = createMockUserNoBalance() as User;

        (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);

        const userDetails = await userService.getUserById(user.id);
        expect(userDetails).toEqual(new UserDetailsDTO(user));
    });

    it('should save a new user', async () => {
        const user = createMockUserNoBalance() as User;

        (mockUserRepository.save as jest.Mock).mockResolvedValue(user);

        (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);

        const savedUser = await userService.saveUser(user);
        expect(savedUser).toEqual(new UserDetailsDTO(user));
    });


    it('should login a user', async () => {
        const user = createMockUserNoBalance() as User;

        (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);
        (mockUserRepository.login as jest.Mock).mockResolvedValue(user.id);

        await userService.loginUser(user.id);
        expect(mockUserRepository.login).toHaveBeenCalledWith(user.id);
    })

    it('should logout a user', async () => {
        const user = createMockUserNoBalance() as User;

        (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);
        (mockUserRepository.logout as jest.Mock).mockResolvedValue(user.id);

        await userService.logoutUser(user.id);
        expect(mockUserRepository.logout).toHaveBeenCalledWith(user.id);
    })

    it('should cashout a user without balance', async () => {
        const user = createMockUserNoBalance() as User;

        (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);
        (mockUserRepository.cashout as jest.Mock).mockResolvedValue(user.id);

        const result = await userService.cashoutUser(user.id);

        expect(result).toBe(-1);
    })


    it('should delete a user', async () => {
        const user = createMockUserNoBalance() as User;

        (mockUserRepository.findById as jest.Mock).mockResolvedValue(user);
        (mockUserRepository.delete as jest.Mock).mockResolvedValue(user);

        const result = await userService.deleteUser(user.id);

        expect(mockUserRepository.delete).toHaveBeenCalledWith(user.id);

        expect(result).toBe(true);
    });
})
