import { CredentialsEmail } from './CredentialsEmail';
import { CredentialsLoggedIn } from './CredentialsLoggedIn';
import { CredentialsPassword } from './CredentialsPassword';
import { CredentialsWithInfo } from './CredentialsWithInfo';

export type CredentialsPrimitives = {
  email: string;
  password: string;
  withInfo: boolean;
  isLoggedIn: boolean;
};

export class Credentials {
  private constructor(
    readonly email: CredentialsEmail,
    readonly password: CredentialsPassword,
    readonly withInfo: CredentialsWithInfo,
    readonly isLoggedIn: CredentialsLoggedIn
  ) {}

  public static create({ email, password, withInfo, isLoggedIn }: CredentialsPrimitives): Credentials {
    return new Credentials(
      new CredentialsEmail(email),
      new CredentialsPassword(password),
      new CredentialsWithInfo(withInfo),
      new CredentialsLoggedIn(isLoggedIn)
    );
  }

  toPrimitives(): CredentialsPrimitives {
    return {
      email: this.email.value,
      password: this.password.value,
      withInfo: this.withInfo.value,
      isLoggedIn: this.isLoggedIn.value,
    };
  }

  static fromPrimitives({ email, password, withInfo, isLoggedIn }: CredentialsPrimitives): Credentials {
    return new Credentials(
      new CredentialsEmail(email),
      new CredentialsPassword(password),
      new CredentialsWithInfo(withInfo),
      new CredentialsLoggedIn(isLoggedIn)
    );
  }
}
