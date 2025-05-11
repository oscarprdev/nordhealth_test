import type { AuthRepository } from '~/features/auth/domain/AuthRepository';
import type { AuthErrorResponse } from '~/features/auth/domain/AuthErrorResponse';
import type { AuthSuccessResponse } from '~/features/auth/domain/AuthSuccessResponse';
import { Credentials, type CredentialsPrimitives } from '~/features/auth/domain/Credentials';
import { errorResponse, successResponse, type Response } from '~/features/shared/domain/Response';

export class SignUpUsecase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(
    email: string,
    password: string,
    withInfo: boolean = false
  ): Promise<Response<AuthSuccessResponse<CredentialsPrimitives>, AuthErrorResponse>> {
    try {
      const credentials = Credentials.create({ email, password, withInfo, isLoggedIn: false });

      if (credentials.email.error || credentials.password.error) {
        return errorResponse<AuthErrorResponse>({
          email: credentials.email.error ?? '',
          password: credentials.password.error ?? '',
        });
      }

      const existingCredentials = await this.repository.get(credentials.email);

      if (existingCredentials) {
        return errorResponse<AuthErrorResponse>({
          global: 'Invalid credentials',
          email: '',
          password: '',
        });
      }

      await this.repository.save(credentials);

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
