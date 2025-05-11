import type { AuthRepository } from '../domain/AuthRepository';
import type { CredentialsPrimitives } from '../domain/Credentials';
import { Credentials } from '../domain/Credentials';
import type { CredentialsEmail } from '../domain/CredentialsEmail';

/**
 * Since assesment ask about client only implementation, we're using localStorage to store the credentials.
 * In a real application, we would use http requests to the server responsible for authentication.
 */
export class LocalStorageAuthRepository implements AuthRepository {
  async get(email: CredentialsEmail): Promise<Credentials | null> {
    const credentials = this.getAllFromLocalStorage();
    const credential = credentials.get(email.value);

    if (!credential) {
      return Promise.resolve(null);
    }

    return Promise.resolve(Credentials.create(credential));
  }

  async findLoggedIn(): Promise<Credentials | null> {
    const credentials = this.getAllFromLocalStorage();
    const credential = Array.from(credentials.values()).find(credential => credential.isLoggedIn);

    if (!credential) {
      return Promise.resolve(null);
    }

    return Promise.resolve(Credentials.create(credential));
  }

  async save(credentials: Credentials): Promise<void> {
    const allCredentials = this.getAllFromLocalStorage();
    const credentialsPrimitives = credentials.toPrimitives();

    allCredentials.set(credentialsPrimitives.email, credentialsPrimitives);

    localStorage.setItem('credentials', JSON.stringify(Array.from(allCredentials.entries())));

    return Promise.resolve();
  }

  private getAllFromLocalStorage(): Map<string, CredentialsPrimitives> {
    const credentials = localStorage.getItem('credentials');

    if (credentials === null) {
      return new Map();
    }

    const map = new Map(JSON.parse(credentials) as Iterable<[string, CredentialsPrimitives]>);

    return map;
  }
}
