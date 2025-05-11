import { expect, test, beforeEach, describe, type MockInstance, vi } from 'vitest';
import { AuthValidateUsecase } from './AuthValidateUsecase';
import { MockAuthRepository } from '../../__mocks__/MockAuthRepository';
import { successResponse, errorResponse } from '~/features/shared/domain/Response';
import { Credentials } from '../../domain/Credentials';

describe('AuthValidateUsecase', () => {
  let authRepository: MockAuthRepository;
  let usecase: AuthValidateUsecase;
  let spyGet: MockInstance;

  beforeEach(() => {
    authRepository = new MockAuthRepository();
    usecase = new AuthValidateUsecase(authRepository);
    spyGet = vi.spyOn(authRepository, 'get');
  });

  test('should validate a user', async () => {
    const credentials = Credentials.create({
      email: 'test@test.com',
      password: 'password',
      withInfo: false,
      isLoggedIn: true,
    });
    spyGet.mockImplementationOnce(() => Promise.resolve(credentials));
    const response = await usecase.execute('test@test.com');
    expect(response).toEqual(successResponse(true));
  });

  test('should return false if user is not logged in', async () => {
    const credentials = Credentials.create({
      email: 'test@test.com',
      password: 'password',
      withInfo: false,
      isLoggedIn: false,
    });
    spyGet.mockImplementationOnce(() => Promise.resolve(credentials));
    const response = await usecase.execute('test@test.com');
    expect(response).toEqual(successResponse(false));
  });

  test('should return an error response if validate repository method fails', async () => {
    spyGet.mockRejectedValueOnce(new Error('Failed to validate'));
    const response = await usecase.execute('test@test.com');
    expect(response).toEqual(errorResponse('Failed to validate'));
  });
});
