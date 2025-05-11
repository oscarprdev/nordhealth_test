import { expect, test, beforeEach, describe, type MockInstance, vi } from 'vitest';
import useSignUpForm from './useSignUpForm';
import { MockAuthRepository } from '~/features/auth/__mocks__/MockAuthRepository';

describe('useSignUpForm', () => {
  let repository: MockAuthRepository;
  let spySignUp: MockInstance;

  beforeEach(() => {
    repository = new MockAuthRepository();
    spySignUp = vi.spyOn(repository, 'save');
  });

  describe('handleChange', () => {
    test('should update the form state with the new value', () => {
      const { formState, handleChange } = useSignUpForm(repository)();

      handleChange('email', 'test@test.com');
      handleChange('password', 'password');
      handleChange('withInfo', 'true');

      expect(formState.value.values.email).toBe('test@test.com');
      expect(formState.value.values.password).toBe('password');
      expect(formState.value.values.withInfo).toBe(true);
    });
  });

  describe('handleSubmit', () => {
    test('should sign up a user with valid credentials', async () => {
      const { formState, handleSubmit, handleChange } = useSignUpForm(repository)();

      handleChange('email', 'test@test.com');
      handleChange('password', 'password');

      await handleSubmit();

      expect(formState.value.successMessage).toBe('User signed up successfully!');
    });

    test('should not sign up a user with invalid credentials', async () => {
      spySignUp.mockRejectedValue(new Error('Invalid credentials'));
      const { formState, handleSubmit, handleChange } = useSignUpForm(repository)();

      handleChange('email', 'test@test.com');
      handleChange('password', 'password');

      await handleSubmit();

      expect(formState.value.errors.global).toBe('Invalid credentials');
    });
  });
});
