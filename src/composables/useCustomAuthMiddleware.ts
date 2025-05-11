import { AuthValidateUsecase } from '~/features/auth/application/validate/AuthValidateUsecase';
import { LocalStorageAuthRepository } from '~/features/auth/infrastructure/LocalStorageAuthRepository';
import { isErrorResponse } from '~/features/shared/domain/Response';

/*
 * For demo purposes, we validate the user's credentials using the LocalStorageRepository.
 * Since we use local storage, we can't validate the user's credentials on a middleware/auth.ts.
 * In a real application, we would use a more secure method, such as JWT tokens stored in cookies and validated on a middleware/auth.ts.
 */
const PROTECTED_ROUTES = ['/dashboard'];

export default async function useCustomAuthMiddleware(path: string, email?: string) {
  const authRepository = new LocalStorageAuthRepository();
  const authValidateUsecase = new AuthValidateUsecase(authRepository);
  const response = await authValidateUsecase.execute();

  if (isErrorResponse(response)) {
    return navigateTo('/signin');
  }

  const isUserLoggedIn = response?.value?.isLoggedIn;
  if (isUserLoggedIn && path === '/signin') {
    return navigateTo(`/dashboard/${email || response.value.email.value}`);
  }

  if (!isUserLoggedIn && PROTECTED_ROUTES.some(route => path.match(route))) {
    return navigateTo('/signin');
  }

  return;
}
