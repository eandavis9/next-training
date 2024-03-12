import { IPatientService } from "@/_shared/interfaces/ipatient.service";
import { prisma } from '@/_shared/lib/prisma'
import { ERRORS } from "@/_shared/constants/errors/error-messages";
import { PatientQueryOptions } from "../models/filters/patient-filter-model";
import { CreateRequest } from "../models/patients/create-patient-model";
import { CreateRequestSchema } from "@/_shared/constants/validations/schemas/patient-schema";
import { z } from 'zod';
import { injectable } from "inversify";
import "reflect-metadata";


export interface PatientCreationResponse {
    success: boolean;
    errorCode?: any;
    errors?: any; 
}

@injectable()
export class PatientService implements IPatientService {
    async getPatients(request: PatientQueryOptions): Promise<any> {
        const { sortBy, sortOrder, page, pageSize } = request;
        const skip = (page - 1) * pageSize;
        
        try {
            const patients = await prisma.patient.findMany({
                orderBy: { [sortBy]: sortOrder },
                take: pageSize,
                skip,
            });
            return { success: true, data: patients };
        } catch (error) {

            return { errorCode: ERRORS.unexpectedError, success: false };
        }
    }
    async createPatient(request: CreateRequest): Promise<any> {

        try {
            const validatedRequest = CreateRequestSchema.parse(request);
            
            const result = await prisma.patient.create({
                data: {
                  first_name: validatedRequest.first_name,
                  last_name: validatedRequest.last_name,
                  birthdate: new Date(validatedRequest.birthdate),
                  address: validatedRequest.address,
                  contact_number: validatedRequest.contact_number,
                  email_address: validatedRequest.email_address,
                  gender: validatedRequest.gender,
                },
              });

            return { success: !! result, data: result };
        } catch (error: any) {
            // TODO: Add error codes
            console.log(error)
            if (error instanceof z.ZodError) {
                // Handle validation errors
                console.error('Validation error:', error);
                const validationErrors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                console.error('Validation errors:', validationErrors);
        
                return { success: false, errorCode: ERRORS.validationError, errors: validationErrors  };
            } else {
                // Handle unexpected errors
                console.error('Error creating patient:', error);
                return { success: false, errorCode: ERRORS.unexpectedError };
            }
        }
    }

}