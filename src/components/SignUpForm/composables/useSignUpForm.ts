import { SignUpUsecase } from '~/features/auth/application/signup/SignUpUsecase';
import type { AuthRepository } from '~/features/auth/domain/AuthRepository';
import type { SignUpFormState, SignUpFormValues } from '../SignUpForm.types';
import { isErrorResponse } from '~/features/shared/domain/Response';
import { ref } from 'vue';

export default function useSignUpForm(repository: AuthRepository) {
  return () => {
    const useCase = new SignUpUsecase(repository);
    const defaultSignUpFormState: SignUpFormState = {
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
    };
    const formState = ref<SignUpFormState>(defaultSignUpFormState);

    const handleChange = (field: keyof SignUpFormValues, value: string) => {
      if (field === 'withInfo') {
        formState.value.values.withInfo = value === 'true';
      } else {
        formState.value.values[field] = value;
      }
    };

    const handleSubmit = async () => {
      formState.value.isLoading = true;
      formState.value.errors.global = '';
      formState.value.successMessage = '';

      const response = await useCase.execute(
        formState.value.values.email,
        formState.value.values.password,
        formState.value.values.withInfo
      );

      if (isErrorResponse(response)) {
        formState.value.errors = {
          email: response.error.email || null,
          password: response.error.password || null,
          global: response.error.global || null,
        };
        formState.value.successMessage = defaultSignUpFormState.successMessage;
        formState.value.isLoading = false;

        return;
      }

      formState.value.values = response.value.values;
      formState.value.successMessage = response.value.successMessage;
      formState.value.errors = {
        email: null,
        password: null,
        global: null,
      };
      formState.value.isLoading = false;
    };

    return {
      formState,
      handleChange,
      handleSubmit,
    };
  };
}
