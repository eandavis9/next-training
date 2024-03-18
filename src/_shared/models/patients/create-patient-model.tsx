export interface CreateRequest {
    first_name: string;
    last_name: string;
    birthdate: Date | string | null;
    address: string;
    gender: string;
    contact_number: string;
    email_address: string;
}
  