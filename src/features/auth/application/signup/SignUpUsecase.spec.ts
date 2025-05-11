import { expect, test, beforeEach, describe, type MockInstance, vi } from 'vitest';
import { SignUpUsecase } from './SignUpUsecase';
import { successResponse, errorResponse } from '~/features/shared/domain/Response';
import { MockAuthRepository } from '../../__mocks__/MockAuthRepository';
import type { AuthRepository } from '../../domain/AuthRepository';

describe('SignUpUsecase', () => {
  let authRepository: AuthRepository;
  let usecase: SignUpUsecase;
  let spySave: MockInstance;
  let spyGet: MockInstance;

  beforeEach(() => {
    authRepository = new MockAuthRepository();
    usecase = new SignUpUsecase(authRepository);
    spySave = vi.spyOn(authRepository, 'save');
    spyGet = vi.spyOn(authRepository, 'get');
  });

  test('should sign up a user with valid credentials', async () => {
    spyGet.mockImplementationOnce(() => Promise.resolve(null));
    const response = await usecase.execute('test@test.com', 'password', true);
    expect(response).toEqual(
      successResponse({
        successMessage: 'User signed up successfully!',
        values: {
          email: 'test@test.com',
          password: 'password',
          withInfo: true,
          isLoggedIn: false,
        },
      })
    );
  });

  test('should return an error response if email is empty', async () => {
    const response = await usecase.execute('', 'password');
    expect(response).toEqual(errorResponse({ email: 'The email is required', password: '' }));
  });

  test('should return an error response if email is invalid', async () => {
    const response = await usecase.execute('invalid-email', 'password');
    expect(response).toEqual(
      errorResponse({
        email: 'The email has an invalid format',
        password: '',
      })
    );
  });

  test('should return an error response if password is empty', async () => {
    const response = await usecase.execute('test@test.com', '');
    expect(response).toEqual(errorResponse({ email: '', password: 'The password is required' }));
  });

  test('should return an error response if password is less than 8 characters', async () => {
    const response = await usecase.execute('test@test.com', 'short');
    expect(response).toEqual(errorResponse({ email: '', password: 'The password must be at least 8 characters long' }));
  });

  test('should return an error if signUp repository method fails', async () => {
    spySave.mockRejectedValueOnce(new Error('Failed to sign up'));
    const response = await usecase.execute('test@test.com', 'password');
    expect(response).toEqual(errorResponse({ email: '', password: '', global: 'Failed to sign up' }));
  });
});
