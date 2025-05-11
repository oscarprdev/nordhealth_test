import { describe, expect, it } from 'vitest';
import { fireEvent, render, waitFor } from '@testing-library/vue';
import LogOutButtonPresentation from './LogOutButtonPresentation.vue';

describe('LogOutButtonPresentation', () => {
  it('should render logout button with correct elements', () => {
    const { getByTestId } = render(LogOutButtonPresentation);

    const button = getByTestId('logout-button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Logout');
  });

  it('should emit click event when button is clicked', async () => {
    const { getByTestId, emitted } = render(LogOutButtonPresentation);

    const button = getByTestId('logout-button');
    await fireEvent.click(button);

    await waitFor(() => {
      expect(emitted().click).toBeTruthy();
      expect(emitted().click.length).toBe(1);
    });
  });
});
