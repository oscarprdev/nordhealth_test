import type { SignUpCredentials } from './SignUpCredentials';

/**
 * Using a repository pattern to abstract the authentication logic from the rest of the application.
 * Following SOLID principles, specifically the Dependency Inversion Principle (DIP).
 * We can easily change the authentication logic by implementing a different repository.
 */
export interface AuthRepository {
  signUp(credentials: SignUpCredentials): Promise<void>;
}
