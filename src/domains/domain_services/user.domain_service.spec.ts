import { Test, TestingModule } from '@nestjs/testing';
import { UserDomainService } from '.';
import { UserRepository } from '../../repositories';

describe('UserDomainService', () => {
  let service: UserDomainService;
  const mockUserRepository = {
    findOneByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDomainService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserDomainService>(UserDomainService);
  });

  describe('findOneByEmail', () => {
    it('メールが重複している', async () => {
      const email = 'aaa@example.com';
      const user = { id: 1, email: email };

      mockUserRepository.findOneByEmail.mockResolvedValue(user);
      const result = await service.isEmailDuplication(email);

      expect(result).toBeTruthy();
      expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(email);
    });

    it('メールが重複していない', async () => {
      const email = 'aaa@example.com';

      mockUserRepository.findOneByEmail.mockResolvedValue(null);
      const result = await service.isEmailDuplication(email);

      expect(result).toBeFalsy();
      expect(mockUserRepository.findOneByEmail).toHaveBeenCalledWith(email);
    });
  });
});
