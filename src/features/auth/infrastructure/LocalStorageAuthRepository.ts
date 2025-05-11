import type { AuthRepository } from '../domain/AuthRepository';
import type { SignUpCredentials } from '../domain/SignUpCredentials';

/**
 * Since assesment ask about client only implementation, we're using localStorage to store the credentials.
 * In a real application, we would use http requests to the server responsible for authentication.
 */
export class LocalStorageAuthRepository implements AuthRepository {
  async signUp(credentials: SignUpCredentials): Promise<void> {
    const currentCredentials = localStorage.getItem('credentials');

    if (currentCredentials && JSON.parse(currentCredentials).email === credentials.email.value) {
      throw new Error('Credentials already exist');
    }

    localStorage.setItem(
      'credentials',
      JSON.stringify({
        email: credentials.email.value,
        password: credentials.password.value,
        withInfo: credentials.withInfo.value,
        loggedIn: false,
      })
    );
  }
}
