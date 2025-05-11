import { SignInUsecase } from '~/features/auth/application/signin/SignInUsecase';
import type { AuthRepository } from '~/features/auth/domain/AuthRepository';
import type { SignInFormState, SignInFormValues } from '../SignInForm.types';
import { isErrorResponse } from '~/features/shared/domain/Response';
import { ref } from 'vue';

export default function useSignInForm(repository: AuthRepository) {
  return () => {
    const useCase = new SignInUsecase(repository);
    const defaultSignInFormState: SignInFormState = {
      isLoading: false,
      successMessage: '',
      values: {
        email: '',
        password: '',
      },
      errors: {
        email: null,
        password: null,
        global: null,
      },
    };

    const formState = ref<SignInFormState>(defaultSignInFormState);

    const handleToggleMode = () => {
      formState.value = defaultSignInFormState;
    };

    const handleChange = (field: keyof SignInFormValues, value: string) => {
      formState.value.values[field] = value;
    };

    const handleSubmit = async () => {
      formState.value.isLoading = true;
      formState.value.errors.global = '';
      formState.value.successMessage = '';

      const response = await useCase.execute(formState.value.values.email, formState.value.values.password);

      if (isErrorResponse(response)) {
        formState.value.errors = {
          email: response.error.email || null,
          password: response.error.password || null,
          global: response.error.global || null,
        };
        formState.value.successMessage = defaultSignInFormState.successMessage;
        formState.value.isLoading = false;

        return;
      }

      formState.value.values = response.value.values;
      formState.value.errors = defaultSignInFormState.errors;
      formState.value.successMessage = response.value.successMessage;
      formState.value.isLoading = false;

      await navigateTo('/dashboard');
    };

    return {
      formState,
      handleToggleMode,
      handleChange,
      handleSubmit,
    };
  };
}
