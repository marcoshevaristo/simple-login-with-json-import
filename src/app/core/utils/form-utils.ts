var Inputmask = require("inputmask");

export const formMasks = {
  cpf: "999.999.999-99",
  mobilePhone: "99 99999-9999",
  phone: "99 9999-9999"
};

export const cpfPattern = "^[0-9]{3}.?[0-9]{3}.?[0-9]{3}-?[0-9]{2}";
export const mobilePhonePattern = "^[0-9]{2} ?[0-9]{5}-?[0-9]{4}";
export const phonePattern = "^[0-9]{2} ?[0-9]{4}-?[0-9]{4}";

export function maskSelector(mask: string, selector: JQuery<HTMLElement>) {
  if (mask && selector) {
    Inputmask(mask).mask(selector);
  }
}
