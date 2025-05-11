import type { SignInUsecase } from '~/features/auth/application/signin/SignInUsecase';

export type SignInFormValues = {
  email: string;
  password: string;
};

export type SignInFormState = {
  isLoading: boolean;
  successMessage: string;
  values: SignInFormValues;
  errors: {
    email: string | null;
    password: string | null;
    global: string | null;
  };
};

export type UseSignInFormInput = {
  signInUsecase: SignInUsecase;
};
