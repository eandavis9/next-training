import { fetchPatients, addPatient  } from "@/app/api";
import { sortItemsByColumn } from '@/_shared/utils/sort'
import * as api from "@/app/api/index"; // Importing the entire module
import { CreateRequest } from '@/_shared/models/patients/create-patient-model'
import { CreateRequestSchema } from "@/_shared/constants/validations/schemas/patient-schema";
import sinon from 'sinon'
import { ERRORS } from "@/_shared/constants/errors/error-messages";

const mockData =  [{ ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
{ ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
{ ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'}]

const patientData: CreateRequest = {
    first_name: 'John',
    last_name: 'Doe',
    birthdate: new Date('1990-01-01'),
    address: '123 Main St',
    contact_number: '09123456789',
    email_address: 'john@example.com',
    gender: 'M'
};

const patientStub = sinon.stub(global, 'fetch')

describe('Patient API', () => {
    afterEach(() => {
        sinon.restore();
    });

    test('should create a new patient', async () => {

        const addPatientStub = patientStub.resolves(new Response(JSON.stringify({
            success: true,
            data: {
                ID: 'P-1',
                patient_name: 'John Doe',
                dentist_name: '',
                last_visit: '',
                last_service: '',
                contact_number: '09123456789'
            }
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }));

        // Call the addPatient function with the patient data
        const response = await addPatient(patientData);
    
        const responseData = await response.json();
       
        expect(addPatientStub.calledOnce).toBe(true);
        expect(addPatientStub.firstCall.args[0]).toBe('/api/patients');
        expect(addPatientStub.firstCall.args[1]?.method).toBe('POST');
        expect(addPatientStub.firstCall.args[1]?.headers).toEqual({
            'Content-Type': 'application/json'
        });

        expect(addPatientStub.firstCall.args[1]?.body).toBe(JSON.stringify(patientData));
        expect(responseData.success).toBe(true);
        expect(responseData.data).toEqual({ ID: 'P-1', patient_name: 'John Doe', dentist_name: '', last_visit: '', last_service: '', contact_number: '09123456789' });
    });

    
    test('should throw unexpected error when creating a patient', async () => {

        const validationErrors = [{ field: 'contact_number', message: 'Invalid number' }];
        const addPatientStub = sinon.stub(global, 'fetch')
                .resolves(new Response(
                    JSON.stringify({ success: false, errorCode: ERRORS.unexpectedError }),
                    { status: 500 }
                ));
        
        const response = await addPatient(patientData);
        const responseData = await response.json()
        
        expect(addPatientStub.calledOnce).toBe(true);
        expect(response.status).toBe(500);
        // Check if the response contains the expected validation errors
        expect(responseData).toEqual({
            success: false,
            errorCode: ERRORS.unexpectedError
        });
    });

    test('should throw Invalid number validation error when creating a patient', async () => {

        const validationErrors = [{ field: 'contact_number', message: 'Invalid number' }]; // Example validation errors
        const addPatientStub = sinon.stub(global, 'fetch')
                .resolves(new Response(
                    JSON.stringify({ success: false, errorCode: ERRORS.validationError, errors: validationErrors }),
                    { status: 422 }
                ));
        
        // change the contact number to an invalid format
        let invalidPatientContactData = { ...patientData };
        invalidPatientContactData.contact_number = '09dj425na92'
        
        const response = await addPatient(invalidPatientContactData);
        const responseData = await response.json()
        
        expect(addPatientStub.calledOnce).toBe(true);
        expect(addPatientStub.firstCall.args[0]).toBe('/api/patients');
        expect(addPatientStub.firstCall.args[1]?.method).toBe('POST');
        expect(addPatientStub.firstCall.args[1]?.headers).toEqual({
            'Content-Type': 'application/json'
        });
        expect(addPatientStub.firstCall.args[1]?.body).toEqual(JSON.stringify(invalidPatientContactData));
        expect(response.status).toBe(422);
        // Check if the response contains the expected validation errors
        expect(responseData).toEqual({
            success: false,
            errorCode: ERRORS.validationError,
            errors: validationErrors,
        });
    });

    test('should throw email validation error when creating a patient', async () => {

        const validationErrors = [{ field: 'email_address', message: 'Invalid email' }];
        const addPatientStub = sinon.stub(global, 'fetch')
                .resolves(new Response(
                    JSON.stringify({ success: false, errorCode: ERRORS.validationError, errors: validationErrors }),
                    { status: 422 }
                ));
        
        // change the contact number to an invalid format
        let invalidPatientData = { ...patientData };
        invalidPatientData.email_address = '@example.com'
        
        const response = await addPatient(invalidPatientData);
        const responseData = await response.json()
        
        expect(addPatientStub.calledOnce).toBe(true);
        expect(addPatientStub.firstCall.args[0]).toBe('/api/patients');
        expect(addPatientStub.firstCall.args[1]?.method).toBe('POST');
        expect(addPatientStub.firstCall.args[1]?.headers).toEqual({
            'Content-Type': 'application/json'
        });
        expect(addPatientStub.firstCall.args[1]?.body).toEqual(JSON.stringify(invalidPatientData));
        expect(response.status).toBe(422);
        // Check if the response contains the expected validation errors
        expect(responseData).toEqual({
            success: false,
            errorCode: ERRORS.validationError,
            errors: validationErrors,
        });
    });

    test('should throw gender validation error when creating a patient', async () => {

        const validationErrors = [{ field: 'gender', message: 'Invalid gender value' }];
        const addPatientStub = sinon.stub(global, 'fetch')
                .resolves(new Response(
                    JSON.stringify({ success: false, errorCode: ERRORS.validationError, errors: validationErrors }),
                    { status: 422 }
                ));
        
        // change the contact number to an invalid format
        let invalidPatientData = { ...patientData };
        invalidPatientData.email_address = '@example.com'
        
        const response = await addPatient(invalidPatientData);
        const responseData = await response.json()
        
        expect(addPatientStub.calledOnce).toBe(true);
        expect(addPatientStub.firstCall.args[0]).toBe('/api/patients');
        expect(addPatientStub.firstCall.args[1]?.method).toBe('POST');
        expect(addPatientStub.firstCall.args[1]?.headers).toEqual({
            'Content-Type': 'application/json'
        });
        expect(addPatientStub.firstCall.args[1]?.body).toEqual(JSON.stringify(invalidPatientData));
        expect(response.status).toBe(422);
        // Check if the response contains the expected validation errors
        expect(responseData).toEqual({
            success: false,
            errorCode: ERRORS.validationError,
            errors: validationErrors,
        });
    });

    test('should throw first_name validation error when creating a patient', async () => {

        const validationErrors = [{ field: 'first_name', message: 'First Name is a required field' }];
        const addPatientStub = sinon.stub(global, 'fetch')
                .resolves(new Response(
                    JSON.stringify({ success: false, errorCode: ERRORS.validationError, errors: validationErrors }),
                    { status: 422 }
                ));
        
        // change the contact number to an invalid format
        let invalidPatientData = { ...patientData };
        invalidPatientData.first_name = ''
    
        const response = await addPatient(invalidPatientData);
        const responseData = await response.json()
        
        expect(addPatientStub.calledOnce).toBe(true);
        expect(addPatientStub.firstCall.args[0]).toBe('/api/patients');
        expect(addPatientStub.firstCall.args[1]?.method).toBe('POST');
        expect(addPatientStub.firstCall.args[1]?.headers).toEqual({
            'Content-Type': 'application/json'
        });
        expect(addPatientStub.firstCall.args[1]?.body).toEqual(JSON.stringify(invalidPatientData));
        expect(invalidPatientData.first_name).toBe('');
        expect(response.status).toBe(422);
        // Check if the response contains the expected validation errors
        expect(responseData).toEqual({
            success: false,
            errorCode: ERRORS.validationError,
            errors: validationErrors,
        });
    });

    test('should throw last_name validation error when creating a patient', async () => {

        const validationErrors = [{ field: 'last_name', message: 'Last Name is a required field' }];
        const addPatientStub = sinon.stub(global, 'fetch')
                .resolves(new Response(
                    JSON.stringify({ success: false, errorCode: ERRORS.validationError, errors: validationErrors }),
                    { status: 422 }
                ));
        
        // change the contact number to an invalid format
        let invalidPatientData = { ...patientData };
        invalidPatientData.last_name = ''
    
        const response = await addPatient(invalidPatientData);
        const responseData = await response.json()
        
        expect(addPatientStub.calledOnce).toBe(true);
        expect(addPatientStub.firstCall.args[0]).toBe('/api/patients');
        expect(addPatientStub.firstCall.args[1]?.method).toBe('POST');
        expect(addPatientStub.firstCall.args[1]?.headers).toEqual({
            'Content-Type': 'application/json'
        });
        expect(addPatientStub.firstCall.args[1]?.body).toEqual(JSON.stringify(invalidPatientData));
        expect(invalidPatientData.last_name).toBe('');
        expect(response.status).toBe(422);
        // Check if the response contains the expected validation errors
        expect(responseData).toEqual({
            success: false,
            errorCode: ERRORS.validationError,
            errors: validationErrors,
        });
    });

    test('should throw address validation error when creating a patient', async () => {

        const validationErrors = [{ field: 'address', message: 'Address is a required field' }];
        const addPatientStub = sinon.stub(global, 'fetch')
                .resolves(new Response(
                    JSON.stringify({ success: false, errorCode: ERRORS.validationError, errors: validationErrors }),
                    { status: 422 }
                ));
        
        // change the contact number to an invalid format
        let invalidPatientData = { ...patientData };
        invalidPatientData.address = ''
    
        const response = await addPatient(invalidPatientData);
        const responseData = await response.json()
        
        expect(addPatientStub.calledOnce).toBe(true);
        expect(addPatientStub.firstCall.args[0]).toBe('/api/patients');
        expect(addPatientStub.firstCall.args[1]?.method).toBe('POST');
        expect(addPatientStub.firstCall.args[1]?.headers).toEqual({
            'Content-Type': 'application/json'
        });
        expect(addPatientStub.firstCall.args[1]?.body).toEqual(JSON.stringify(invalidPatientData));
        expect(invalidPatientData.address).toBe('');
        expect(response.status).toBe(422);
        // Check if the response contains the expected validation errors
        expect(responseData).toEqual({
            success: false,
            errorCode: ERRORS.validationError,
            errors: validationErrors,
        });
    });

    test('should throw birthdate validation error when creating a patient', async () => {

        const validationErrors = [{ field: 'birthdate', message: 'Birthdate is a required field' }];
        const addPatientStub = sinon.stub(global, 'fetch')
                .resolves(new Response(
                    JSON.stringify({ success: false, errorCode: ERRORS.validationError, errors: validationErrors }),
                    { status: 422 }
                ));
        
        let invalidPatientData = { ...patientData };
        invalidPatientData.birthdate = ''
    
        const response = await addPatient(invalidPatientData);
        const responseData = await response.json()
        
        expect(addPatientStub.calledOnce).toBe(true);
        expect(addPatientStub.firstCall.args[0]).toBe('/api/patients');
        expect(addPatientStub.firstCall.args[1]?.method).toBe('POST');
        expect(addPatientStub.firstCall.args[1]?.headers).toEqual({
            'Content-Type': 'application/json'
        });
        expect(addPatientStub.firstCall.args[1]?.body).toEqual(JSON.stringify(invalidPatientData));
        expect(invalidPatientData.birthdate).toBe('');
        expect(response.status).toBe(422);
        // Check if the response contains the expected validation errors
        expect(responseData).toEqual({
            success: false,
            errorCode: ERRORS.validationError,
            errors: validationErrors,
        });
    });
});