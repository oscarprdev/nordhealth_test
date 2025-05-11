export class CredentialsEmail {
  static readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  readonly error: string | null = null;
  private readonly emptyValueMessage = 'The email is required';
  private readonly invalidMessage = 'The email has an invalid format';

  constructor(readonly value: string) {
    if (!value) {
      this.error = this.emptyValueMessage;
      return;
    }

    if (!CredentialsEmail.isValid(value)) {
      this.error = this.invalidMessage;
    }
  }

  public static isValid(value: string): boolean {
    return CredentialsEmail.emailRegex.test(value);
  }
}
