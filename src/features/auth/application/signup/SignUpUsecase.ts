import type { AuthRepository } from '~/features/auth/domain/AuthRepository';
import type { AuthErrorResponse } from '~/features/auth/domain/AuthErrorResponse';
import type { AuthSuccessResponse } from '~/features/auth/domain/AuthSuccessResponse';
import { SignUpCredentials, type SignUpCredentialsPrimitives } from '~/features/auth/domain/SignUpCredentials';
import { errorResponse, successResponse, type Response } from '~/features/shared/domain/Response';

export class SignUpUsecase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(
    email: string,
    password: string,
    withInfo: boolean = false
  ): Promise<Response<AuthSuccessResponse<SignUpCredentialsPrimitives>, AuthErrorResponse>> {
    try {
      const credentials = SignUpCredentials.create({ email, password, withInfo });

      if (credentials.email.error || credentials.password.error) {
        return errorResponse<AuthErrorResponse>({
          email: credentials.email.error ?? '',
          password: credentials.password.error ?? '',
        });
      }

      await this.repository.signUp(credentials);

      return successResponse({
        successMessage: 'User signed up successfully!',
        values: credentials.toPrimitives(),
      });
    } catch (error) {
      return errorResponse<AuthErrorResponse>({
        email: '',
        password: '',
        global: error instanceof Error ? error.message : 'Error signing up',
      });
    }
  }
}
