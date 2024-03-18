import { z } from 'zod';
import { GenderEnum } from '@/_shared/enums/GenderEnum';
import { DEFAULT_EMAIL_PATTERN_REGEX } from '@/_shared/constants/patterns.constant'

const phoneRegex = /^[0-9]{11}$/;

export const CreateRequestSchema = z.object({
  first_name: z.string().min(1, { message: "First Name is a required field" }),
  last_name: z.string().min(1, { message: "Last Name is a required field" }),
  birthdate: z.coerce.date(),
  address: z.string().min(1, { message: "Address is a required field" }),
  gender: z.nativeEnum(GenderEnum, {
    errorMap: () => ({
      message: 'Invalid gender value',
    })
  }),
  contact_number:  z.string().regex(phoneRegex, 'Invalid Number'),
  email_address: z.string().email().regex(DEFAULT_EMAIL_PATTERN_REGEX, 'Invalid email'),
});