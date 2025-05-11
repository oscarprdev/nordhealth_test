export type AuthPasswordInputProps = {
  value: string;
  error: string | null;
};

export type AuthPasswordInputEmits = {
  (e: 'input', value: string): void;
};

export const AUTH_PASSWORD_INPUT_TYPES = {
  PASSWORD: 'password',
  TEXT: 'text',
} as const;

export type AuthPasswordInputType = (typeof AUTH_PASSWORD_INPUT_TYPES)[keyof typeof AUTH_PASSWORD_INPUT_TYPES];
