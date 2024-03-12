import { conn } from "@/lib/db.js";

interface PatientQueryOptions {
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    pageSize?: number;
}

export async function getPatients(options: PatientQueryOptions): Promise<any[]> {
    const { sortBy, sortOrder, page, pageSize } = options;
    const offset = (page - 1) * pageSize;
    const query = `
        SELECT * FROM "ClinicSchema"."patients"
        ORDER BY ${sortBy} ${sortOrder}
        LIMIT ${pageSize} OFFSET ${offset};
    `;

    try {
        const result = await conn.query(query);
        return result.rows;
    } catch (error) {
        throw new Error('Failed to fetch patients');
    }
}

export async function insertPatient(patientData: any): Promise<any> {
    const { first_name, last_name, birthdate, address, contact_number, email_address, gender } = patientData;

    const query = `
        INSERT INTO "ClinicSchema"."patients" (first_name, last_name, birthdate, address, contact_number, email_address, gender, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
        RETURNING *;
    `;
    const values = [first_name, last_name, birthdate, address, contact_number, email_address, gender];

    try {
        const result = await conn.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw new Error('Failed to insert patient data');
    }
}