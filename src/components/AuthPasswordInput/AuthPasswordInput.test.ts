import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import { screen } from 'shadow-dom-testing-library';
import AuthPasswordInput from './AuthPasswordInput.vue';

describe('AuthPasswordInput', () => {
  it('should render', () => {
    const { getByTestId } = render(AuthPasswordInput);

    getByTestId('auth-password-input');
  });

  it('should toggle type of password input when button is clicked', async () => {
    const { getByTestId } = render(AuthPasswordInput);
    const input = screen.getByShadowPlaceholderText('••••••••') as HTMLInputElement;
    const button = getByTestId('toggle-visibility-button');

    const currentType = input.getAttribute('type');
    expect(currentType).toBe('password');

    fireEvent.click(button);

    await waitFor(() => {
      expect(input.getAttribute('type')).toBe('text');
    });
  });
});
