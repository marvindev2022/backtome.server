import { PhoneValidator } from './phoneValidator';

describe('Phone Validator', () => {
  it('should return false if invalid phone number', () => {
    const phoneNumber = '9874264';

    const phoneNumberIsValid = new PhoneValidator().execute(phoneNumber);

    expect(phoneNumberIsValid).toBeFalsy();
  });

  it('should return verified phone number if is valid', () => {
    const phoneNumber = '11987654321';

    const phoneNumberIsValid = new PhoneValidator().execute(phoneNumber);

    expect(phoneNumberIsValid).toEqual(phoneNumber);
  });
});
