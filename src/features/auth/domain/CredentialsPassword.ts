export class CredentialsPassword {
  static readonly MIN_PASSWORD_LENGTH = 8;
  readonly error: string | null = null;
  private readonly emptyValueMessage = 'The password is required';
  private readonly invalidMessage = `The password must be at least ${CredentialsPassword.MIN_PASSWORD_LENGTH} characters long`;

  constructor(readonly value: string) {
    if (!value) {
      this.error = this.emptyValueMessage;
      return;
    }

    if (!CredentialsPassword.isValid(value)) {
      this.error = this.invalidMessage;
    }
  }

  public static isValid(value: string): boolean {
    return value.length >= CredentialsPassword.MIN_PASSWORD_LENGTH;
  }
}
