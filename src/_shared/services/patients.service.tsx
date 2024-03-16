import { IPatientService } from "@/_shared/interfaces/ipatient.service";
import { prisma } from "@/_shared/lib/prisma";
import { ERRORS } from "@/_shared/constants/errors/error-messages";
import { PatientQueryOptions } from "../models/filters/patient-filter-model";
import { CreateRequest } from "../models/patients/create-patient-model";
import { PatientList } from "../models/patients/patient-list-model";
import { CreateRequestSchema } from "@/_shared/constants/validations/schemas/patient-schema";
import { z } from "zod";
import { injectable } from "inversify";
import moment from "moment";
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
    const currentDate = moment();

    try {
      const totalPatientsCount = await prisma.patient.count();

      const patients = await prisma.patient.findMany({
        orderBy: { [sortBy]: sortOrder },
        take: pageSize,
        skip,
        include: {
          histories: {
            include: {
              dentist: true,
            },
          },
        },
      });

      // transform patients to PatientList
      const list: PatientList[] = patients.map((patient) => {
        // Extract the most recent visit and associated dentist information
        const recentVisit = patient.histories[0];
        const dentist = recentVisit ? recentVisit.dentist : null;

        return {
          ID: `P-${patient.id}`,
          patient_name: `${patient.first_name} ${patient.last_name}`,
          dentist_name: dentist
            ? `${dentist.first_name} ${dentist.last_name}`
            : "",
          last_visit: recentVisit
            ? moment(recentVisit.visit_date).format("YYYY-MM-DD")
            : "",
          last_service: recentVisit ? recentVisit.service_name : "",
          contact_number: patient.contact_number,
        };
      });
      return { success: true, data: list, totalCount: totalPatientsCount };
    } catch (error) {
      console.log(error);
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

      const createdPatient: PatientList = {
        ID: `P-${result.id}`,
        patient_name: `${result.first_name} ${result.last_name}`,
        dentist_name: "",
        last_visit: "",
        last_service: "",
        contact_number: result.contact_number,
      };

      return { success: !!result, data: createdPatient };
    } catch (error: any) {
      // TODO: Add error codes
      console.log(error);
      if (error instanceof z.ZodError) {
        // Handle validation errors
        console.error("Validation error:", error);
        const validationErrors = error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        console.error("Validation errors:", validationErrors);

        return {
          success: false,
          errorCode: ERRORS.validationError,
          errors: validationErrors,
        };
      } else {
        // Handle unexpected errors
        console.error("Error creating patient:", error);
        return { success: false, errorCode: ERRORS.unexpectedError };
      }
    }
  }
}
