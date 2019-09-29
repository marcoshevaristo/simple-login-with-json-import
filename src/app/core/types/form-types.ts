export interface RegistrationFormType {
  cpf: string;
  name?: string;
  description?: string;
  address: {
    street: string;
    type?: AddressType;
  };
  phone?: [
    { number: string; type: PhoneType },
    { number: string; type: PhoneType },
    { number: string; type: PhoneType }
  ];
}

export enum AddressType {
  R = "Rua",
  AV = "AV"
}

export enum PhoneType {
  MOBILE = "mobile",
  HOME = "home",
  WORK = "work"
}
