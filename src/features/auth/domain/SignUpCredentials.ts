import { CredentialsEmail } from './CredentialsEmail';
import { CredentialsPassword } from './CredentialsPassword';
import { CredentialsWithInfo } from './CredentialsWithInfo';

export type SignUpCredentialsPrimitives = {
  email: string;
  password: string;
  withInfo: boolean;
};

export class SignUpCredentials {
  private constructor(
    readonly email: CredentialsEmail,
    readonly password: CredentialsPassword,
    readonly withInfo: CredentialsWithInfo
  ) {}

  public static create({ email, password, withInfo }: SignUpCredentialsPrimitives): SignUpCredentials {
    return new SignUpCredentials(
      new CredentialsEmail(email),
      new CredentialsPassword(password),
      new CredentialsWithInfo(withInfo)
    );
  }

  toPrimitives(): SignUpCredentialsPrimitives {
    return {
      email: this.email.value,
      password: this.password.value,
      withInfo: this.withInfo.value,
    };
  }

  static fromPrimitives({ email, password, withInfo }: SignUpCredentialsPrimitives): SignUpCredentials {
    return new SignUpCredentials(
      new CredentialsEmail(email),
      new CredentialsPassword(password),
      new CredentialsWithInfo(withInfo)
    );
  }
}
