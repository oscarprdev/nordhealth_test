import { errorResponse, successResponse, type Response } from '~/features/shared/domain/Response';
import type { AuthRepository } from '../../domain/AuthRepository';
import type { AuthSuccessResponse } from '../../domain/AuthSuccessResponse';
import { CredentialsEmail } from '../../domain/CredentialsEmail';
import { Credentials } from '../../domain/Credentials';

export class LogoutUsecase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(email: string): Promise<Response<AuthSuccessResponse<string>, string>> {
    try {
      const currentCredentials = await this.repository.get(new CredentialsEmail(email));
      if (!currentCredentials) {
        return errorResponse('User not found');
      }

      const credentials = Credentials.create({
        email: currentCredentials.email.value,
        password: currentCredentials.password.value,
        withInfo: currentCredentials.withInfo.value,
        isLoggedIn: false,
      });

      await this.repository.save(credentials);

      return successResponse({
        successMessage: 'User logged out successfully!',
        values: '',
      });
    } catch (error) {
      return errorResponse<string>(error instanceof Error ? error.message : 'Failed to logout');
    }
  }
}
