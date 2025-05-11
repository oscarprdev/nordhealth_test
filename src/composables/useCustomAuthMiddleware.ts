import { AuthValidateUsecase } from '~/features/auth/application/validate/AuthValidateUsecase';
import { LocalStorageAuthRepository } from '~/features/auth/infrastructure/LocalStorageAuthRepository';
import { isErrorResponse } from '~/features/shared/domain/Response';

/*
 * For demo purposes, we validate the user's credentials using the LocalStorageRepository.
 * Since we use local storage, we can't validate the user's credentials on a middleware/auth.ts.
 * In a real application, we would use a more secure method, such as JWT tokens stored in cookies and validated on a middleware/auth.ts.
 */
const PROTECTED_ROUTES = ['/dashboard'];

export default async function useCustomAuthMiddleware(path: string, props?: string) {
  const authRepository = new LocalStorageAuthRepository();
  const authValidateUsecase = new AuthValidateUsecase(authRepository);

  if (!props) {
    return navigateTo('/signin');
  }

  const response = await authValidateUsecase.execute(props);
  if (isErrorResponse(response)) {
    return navigateTo('/signin');
  }

  if (!response.value && PROTECTED_ROUTES.includes(path)) {
    return navigateTo('/signin');
  } else if (response.value && path === '/signin') {
    return navigateTo('/dashboard');
  }
}
