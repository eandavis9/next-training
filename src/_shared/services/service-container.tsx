import { Container } from "inversify";
import { CONTAINER_IDENTIFIER } from "../constants/container-identifier";
import { IPatientService } from "../interfaces/ipatient.service";
import { PatientService } from "./patients.service";
import "reflect-metadata";


const container = new Container();

export default container;

container
     .bind<IPatientService>(CONTAINER_IDENTIFIER.IPATIENT_SERVICE)
     .to(PatientService)
     .inSingletonScope();