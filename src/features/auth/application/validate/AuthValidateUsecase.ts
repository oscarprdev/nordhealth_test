import type { AuthRepository } from '../../domain/AuthRepository';
import { errorResponse, successResponse, type Response } from '~/features/shared/domain/Response';
import type { Credentials } from '../../domain/Credentials';

export class AuthValidateUsecase {
  constructor(private readonly repository: AuthRepository) {}

  async execute(): Promise<Response<Credentials, string>> {
    try {
      const credentials = await this.repository.findLoggedIn();

      if (!credentials) {
        return errorResponse('No credentials found');
      }

      return successResponse(credentials);
    } catch (error) {
      return errorResponse(error instanceof Error ? error.message : 'Failed to validate');
    }
  }
}
