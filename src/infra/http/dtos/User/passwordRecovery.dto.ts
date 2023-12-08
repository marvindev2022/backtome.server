export interface PasswordRecoveryDTO {
  email: string;
  cpf: string;
}

export interface PasswordRecoveryMailDTO {
  email: string;
  recoveryLink: string;
}
