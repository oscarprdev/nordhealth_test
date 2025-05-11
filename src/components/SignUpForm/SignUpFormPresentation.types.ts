import type { SignUpFormState, SignUpFormValues } from './SignUpForm.types';

export type SignUpFormPresentationProps = {
  formState: SignUpFormState;
};

export type SignUpFormPresentationEmits = {
  (e: 'submit', form: SignUpFormState): void;
  (e: 'change', field: keyof SignUpFormValues, value: string): void;
};
