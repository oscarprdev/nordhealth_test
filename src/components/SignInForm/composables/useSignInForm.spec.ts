import { expect, test, beforeEach, describe, type MockInstance, vi } from 'vitest';
import useSignInForm from './useSignInForm';
import { MockAuthRepository } from '~/features/auth/__mocks__/MockAuthRepository';

describe('useSignInForm', () => {
  let repository: MockAuthRepository;
  let spySignIn: MockInstance;

  beforeEach(() => {
    repository = new MockAuthRepository();
    spySignIn = vi.spyOn(repository, 'save');
  });

  describe('handleChange', () => {
    test('should update the form state with the new value', () => {
      const { formState, handleChange } = useSignInForm(repository)();

      handleChange('email', 'test@test.com');
      handleChange('password', 'password');

      expect(formState.value.values.email).toBe('test@test.com');
      expect(formState.value.values.password).toBe('password');
    });
  });

  describe('handleSubmit', () => {
    test('should sign in a user with valid credentials', async () => {
      const { formState, handleSubmit, handleChange } = useSignInForm(repository)();

      handleChange('email', 'test@test.com');
      handleChange('password', 'password');

      await handleSubmit();

      expect(formState.value.values.email).toBe('test@test.com');
      expect(formState.value.values.password).toBe('password');
    });

    test('should not sign in a user with invalid credentials', async () => {
      spySignIn.mockRejectedValue(new Error('Invalid credentials'));
      const { formState, handleSubmit, handleChange } = useSignInForm(repository)();

      handleChange('email', 'test@test.com');
      handleChange('password', 'password');

      await handleSubmit();

      expect(formState.value.errors.global).toBe('Invalid credentials');
    });
  });
});
