import type { CredentialsEmail } from '~/features/auth/domain/CredentialsEmail';
import type { Credentials } from '~/features/auth/domain/Credentials';
import type { AuthRepository } from '~/features/auth/domain/AuthRepository';

export class MockAuthRepository implements AuthRepository {
  async get(_email: CredentialsEmail): Promise<Credentials | null> {
    return Promise.resolve(null);
  }

  async save(_credentials: Credentials): Promise<void> {
    return Promise.resolve();
  }
}
