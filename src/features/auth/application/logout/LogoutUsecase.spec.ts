import { expect, test, beforeEach, describe, type MockInstance, vi } from 'vitest';
import { LogoutUsecase } from './LogoutUsecase';
import { MockAuthRepository } from '../../__mocks__/MockAuthRepository';
import { successResponse, errorResponse } from '~/features/shared/domain/Response';
import { Credentials } from '../../domain/Credentials';

describe('LogoutUsecase', () => {
  let authRepository: MockAuthRepository;
  let usecase: LogoutUsecase;
  let spySave: MockInstance;
  let spyGet: MockInstance;

  beforeEach(() => {
    authRepository = new MockAuthRepository();
    usecase = new LogoutUsecase(authRepository);
    spySave = vi.spyOn(authRepository, 'save');
    spyGet = vi.spyOn(authRepository, 'get');
  });

  test('should logout a user', async () => {
    const credentials = Credentials.create({
      email: 'test@test.com',
      password: 'password',
      withInfo: false,
      isLoggedIn: true,
    });
    spyGet.mockImplementationOnce(() => Promise.resolve(credentials));
    const response = await usecase.execute('test@test.com');
    expect(response).toEqual(
      successResponse({
        successMessage: 'User logged out successfully!',
        values: '',
      })
    );
  });

  test('should return an error response if user not found', async () => {
    spyGet.mockImplementationOnce(() => Promise.resolve(null));
    const response = await usecase.execute('test@test.com');
    expect(response).toEqual(errorResponse('User not found'));
  });

  test('should return an error response if logout repository method fails', async () => {
    const credentials = Credentials.create({
      email: 'test@test.com',
      password: 'password',
      withInfo: false,
      isLoggedIn: true,
    });
    spyGet.mockImplementationOnce(() => Promise.resolve(credentials));
    spySave.mockRejectedValueOnce(new Error('Failed to logout'));
    const response = await usecase.execute('test@test.com');
    expect(response).toEqual(errorResponse('Failed to logout'));
  });
});
