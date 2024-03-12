import { z } from 'zod';

export const CreateRequestSchema = z.object({
  first_name: z.string().nonempty(),
  last_name: z.string().nonempty(),
  birthdate: z.coerce.date(), // Convert string to Date//
  address: z.string().nonempty(),
  gender: z.string().nonempty(),
  contact_number: z.string().nonempty(),
  email_address: z.string().email(),
});