import type { SignInFormState, SignInFormValues } from './SignInForm.types';

export type SignInFormPresentationProps = {
  formState: SignInFormState;
};

export type SignInFormPresentationEmits = {
  (e: 'submit', form: SignInFormState): void;
  (e: 'change', field: keyof SignInFormValues, value: string): void;
};
