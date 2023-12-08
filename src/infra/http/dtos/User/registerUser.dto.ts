export interface RegisterUserDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  age?: string;
  photo?: string;
  address?: {
    cep: string;
    complement?: string;
    number?:string;
  };
}
