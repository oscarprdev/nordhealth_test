import type { SignUpCredentials } from '~/features/auth/domain/SignUpCredentials';
import type { AuthRepository } from '~/features/auth/domain/AuthRepository';

export class MockAuthRepository implements AuthRepository {
  async signUp(_credentials: SignUpCredentials): Promise<void> {
    return Promise.resolve();
  }
}
