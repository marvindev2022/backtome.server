import { z } from 'zod';

export class PhoneValidator {
  execute(phone: string): string | false {
    const phoneSchema = z
      .string()
      .min(9)
      .refine((phone) => phone.trim().replace(' ', ''));
    const phoneIsValid = phoneSchema.safeParse(phone);

    if (!phoneIsValid.success) {
      return false;
    }

    return phoneIsValid.data;
  }
}
