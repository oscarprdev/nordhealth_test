import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import SignUpFormPresentation from './SignUpFormPresentation.vue';
import type { SignUpFormState } from './SignUpForm.types';
import { screen } from 'shadow-dom-testing-library';
import { fireShadowEvent } from '~/utils/fireShadowEvent';

const mockFormState = {
  isLoading: false,
  successMessage: '',
  values: {
    email: '',
    password: '',
    withInfo: false,
  },
  errors: {
    email: null,
    password: null,
    global: null,
  },
} satisfies SignUpFormState;
describe('SignUpFormPresentation', () => {
  it('should render sign up form with correct elements', () => {
    const { getByTestId } = render(SignUpFormPresentation, {
      props: {
        formState: mockFormState,
      },
    });

    getByTestId('auth-logo');
    getByTestId('auth-title');
    getByTestId('auth-form');
    getByTestId('auth-email-input');
    getByTestId('auth-password-input');
    getByTestId('auth-with-info-toggle');
    getByTestId('auth-sign-up-button');
    getByTestId('auth-sign-in-link');
  });

  it('should render success message when successMessage is not empty', () => {
    const { getByTestId } = render(SignUpFormPresentation, {
      props: {
        formState: { ...mockFormState, successMessage: 'Success message' },
      },
    });

    const successMessage = getByTestId('auth-success-message');
    expect(successMessage.textContent).toEqual('Success message');
  });

  it('should render error message when error is not empty', () => {
    const { getByTestId } = render(SignUpFormPresentation, {
      props: {
        formState: { ...mockFormState, errors: { ...mockFormState.errors, global: 'Error message' } },
      },
    });

    const errorMessage = getByTestId('auth-error-message');
    expect(errorMessage.textContent).toEqual('Error message');
  });

  it('should email input fire change event when value is changed', async () => {
    const { emitted } = render(SignUpFormPresentation, {
      props: {
        formState: { ...mockFormState },
      },
    });

    const input = screen.getByShadowPlaceholderText('user@example.com');
    fireShadowEvent(input, 'input', { value: 'test@test.com' });

    await waitFor(() => {
      expect(emitted().change?.[0]).toEqual(['email', 'test@test.com']);
    });
  });

  it('should password input fire change event when value is changed', async () => {
    const { emitted } = render(SignUpFormPresentation, {
      props: {
        formState: { ...mockFormState },
      },
    });

    const input = screen.getByShadowPlaceholderText('••••••••');
    fireShadowEvent(input, 'input', { value: '12345678' });

    await waitFor(() => {
      expect(emitted().change?.[0]).toEqual(['password', '12345678']);
    });
  });

  it('should emit submit event when form is submitted', async () => {
    const { getByTestId, emitted } = render(SignUpFormPresentation, {
      props: {
        formState: { ...mockFormState },
      },
    });

    const form = getByTestId('auth-form');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(emitted().submit?.[0]).toEqual([mockFormState]);
    });
  });
});
