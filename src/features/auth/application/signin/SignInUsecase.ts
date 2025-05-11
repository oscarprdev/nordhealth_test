import { errorResponse, successResponse, type Response } from '~/features/shared/domain/Response';
import type { AuthRepository } from '../../domain/AuthRepository';
import type { AuthErrorResponse } from '../../domain/AuthErrorResponse';
import { Credentials, type CredentialsPrimitives } from '../../domain/Credentials';
import type { AuthSuccessResponse } from '../../domain/AuthSuccessResponse';

export class SignInUsecase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(
    email: string,
    password: string
  ): Promise<Response<AuthSuccessResponse<CredentialsPrimitives>, AuthErrorResponse>> {
    try {
      const credentials = Credentials.create({ email, password, withInfo: false, isLoggedIn: true });

      if (credentials.email.error || credentials.password.error) {
        return errorResponse<AuthErrorResponse>({
          email: credentials.email.error ?? '',
          password: credentials.password.error ?? '',
        });
      }

      const existingCredentials = await this.repository.get(credentials.email);

      if (!existingCredentials || existingCredentials.password.value !== password) {
        return errorResponse<AuthErrorResponse>({
          global: 'Invalid credentials',
          email: '',
          password: '',
        });
      }

      await this.repository.save(credentials);

      return successResponse({
        successMessage: 'User signed in successfully!',
        values: existingCredentials.toPrimitives(),
      });
    } catch (error) {
      return errorResponse<AuthErrorResponse>({
        email: '',
        password: '',
        global: error instanceof Error ? error.message : 'Error signing in',
      });
    }
  }
}
