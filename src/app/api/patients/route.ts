import { NextRequest, NextResponse } from 'next/server';
import { insertPatient, getPatients } from '@/services/patientService';

export const dynamic = 'force-dynamic'; // defaults to auto

export async function GET(request: NextRequest): Promise<any> {
    try {
        const searchParams = request.nextUrl.searchParams;
        const sortBy = searchParams.get('sortBy');
        const sortOrder = searchParams.get('sortOrder');
        const page = parseInt(searchParams.get('page'), 10) || 1; // Default to page 1 if not provided or invalid
        const pageSize = parseInt(searchParams.get('pageSize'), 10) || 10; // Default to page size of 10 if not provided or invalid

        const options = { sortBy, sortOrder, page, pageSize };

        const patients = await getPatients(options);
        return NextResponse.json(patients, { status: 200 });

    } catch (error) {
        console.error('Error fetching patients:', error);
        return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 });
    }
}

export async function POST(request: Request) {

    try {
        const  body  = await request.json();
        const validationErrors = {};

         // Validation rules for each input field
        const validationRules = {
            first_name: {
                required: true,
                message: 'First name is required'
            },
            last_name: {
                required: true,
                message: 'Last name is required'
            },
            birthdate: {
                required: true,
                message: 'Birthdate is required'
            },
            address: {
                required: true,
                message: 'Address is required'
            },
            contact_number: {
                required: true,
                message: 'Contact number is required'
            },
            email_address: {
                required: true,
                message: 'Email address is required',
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            gender: {
                required: true,
                message: 'Gender is required'
            }
        };

          // Validate each input field
          for (const fieldName in validationRules) {
            const rule = validationRules[fieldName];
            const value = body[fieldName];

            if (rule.required && (!value || value.trim() === '')) {
                validationErrors[fieldName] = rule.message;
            } else if (rule.pattern && !rule.pattern.test(value)) {
                validationErrors[fieldName] = 'Invalid format';
            }
        }

        // If there are validation errors, return them
        if (Object.keys(validationErrors).length > 0) {
            return NextResponse.json({ errors: validationErrors }, { status: 400 });
        }

        // Insert patient data into the database
        const insertedPatient = await insertPatient(body);

        return NextResponse.json(insertedPatient, { status: 201 });

    } catch (error) {
        console.error('Error inserting patient data:', error);
        return NextResponse.json({ error: 'Failed to insert patient data' }, { status: 500 });
    }
}

