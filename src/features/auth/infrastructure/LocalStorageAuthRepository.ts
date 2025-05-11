import type { AuthRepository } from '../domain/AuthRepository';
import type { SignUpCredentials, SignUpCredentialsPrimitives } from '../domain/SignUpCredentials';

/**
 * Since assesment ask about client only implementation, we're using localStorage to store the credentials.
 * In a real application, we would use http requests to the server responsible for authentication.
 */
export class LocalStorageAuthRepository implements AuthRepository {
  async signUp(credentials: SignUpCredentials): Promise<void> {
    const allCredentials = this.getAllFromLocalStorage();
    const credentialsPrimitives = credentials.toPrimitives();

    if (allCredentials.has(credentialsPrimitives.email)) {
      throw new Error('Invalid credentials');
    }

    allCredentials.set(credentialsPrimitives.email, credentialsPrimitives);

    localStorage.setItem('credentials', JSON.stringify(Array.from(allCredentials.entries())));

    return Promise.resolve();
  }

  private getAllFromLocalStorage(): Map<string, SignUpCredentialsPrimitives> {
    const credentials = localStorage.getItem('credentials');

    if (credentials === null) {
      return new Map();
    }

    const map = new Map(JSON.parse(credentials) as Iterable<[string, SignUpCredentialsPrimitives]>);

    return map;
  }
}
