import type { SignUpUsecase } from '~/features/auth/application/signup/SignUpUsecase';

export type SignUpFormValues = {
  email: string;
  password: string;
  withInfo: boolean;
};

export type SignUpFormState = {
  isLoading: boolean;
  successMessage: string;
  values: SignUpFormValues;
  errors: {
    email: string | null;
    password: string | null;
    global: string | null;
  };
};

export type UseSignUpFormInput = {
  signUpUsecase: SignUpUsecase;
};
