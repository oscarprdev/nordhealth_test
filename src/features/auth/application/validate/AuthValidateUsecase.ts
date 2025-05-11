import type { AuthRepository } from '../../domain/AuthRepository';
import { errorResponse, successResponse, type Response } from '~/features/shared/domain/Response';
import { CredentialsEmail } from '../../domain/CredentialsEmail';

export class AuthValidateUsecase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(email: string): Promise<Response<boolean, string>> {
    try {
      const credentialsEmail = new CredentialsEmail(email);
      const credentials = await this.repository.get(credentialsEmail);
      return successResponse(credentials !== null && credentials.isLoggedIn.value);
    } catch (error) {
      return errorResponse(error instanceof Error ? error.message : 'Failed to validate');
    }
  }
}
