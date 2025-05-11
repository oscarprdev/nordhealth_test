import { expect, test, beforeEach, describe, type MockInstance, vi } from 'vitest';
import { AuthValidateUsecase } from './AuthValidateUsecase';
import { MockAuthRepository } from '../../__mocks__/MockAuthRepository';
import { successResponse, errorResponse } from '~/features/shared/domain/Response';
import { Credentials } from '../../domain/Credentials';

describe('AuthValidateUsecase', () => {
  let authRepository: MockAuthRepository;
  let usecase: AuthValidateUsecase;
  let spyFindLoggedIn: MockInstance;

  beforeEach(() => {
    authRepository = new MockAuthRepository();
    usecase = new AuthValidateUsecase(authRepository);
    spyFindLoggedIn = vi.spyOn(authRepository, 'findLoggedIn');
  });

  test('should validate a user', async () => {
    const credentials = Credentials.create({
      email: 'test@test.com',
      password: 'password',
      withInfo: false,
      isLoggedIn: true,
    });
    spyFindLoggedIn.mockImplementationOnce(() => Promise.resolve(credentials));
    const response = await usecase.execute();
    expect(response).toEqual(successResponse(credentials));
  });

  test('should return error response if user is not logged in', async () => {
    spyFindLoggedIn.mockImplementationOnce(() => Promise.resolve(null));
    const response = await usecase.execute();
    expect(response).toEqual(errorResponse('No credentials found'));
  });

  test('should return an error response if validate repository method fails', async () => {
    spyFindLoggedIn.mockRejectedValueOnce(new Error('Failed to validate'));
    const response = await usecase.execute();
    expect(response).toEqual(errorResponse('Failed to validate'));
  });
});
