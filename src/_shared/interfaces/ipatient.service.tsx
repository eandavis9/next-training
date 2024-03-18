
import { CreateRequest } from "../models/patients/create-patient-model";
import { PatientQueryOptions } from "../models/filters/patient-filter-model";

export interface IPatientService {
    getPatients(request: PatientQueryOptions): Promise<any>;
    createPatient(request: CreateRequest): Promise<any>;
}