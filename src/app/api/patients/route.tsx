import { NextRequest, NextResponse } from "next/server";
import { CONTAINER_IDENTIFIER } from "@/_shared/constants/container-identifier";
import { IPatientService } from "@/_shared/interfaces/ipatient.service";
import container from "@/_shared/services/service-container";

export const dynamic = "force-dynamic"; // defaults to auto

const patientService = container.get<IPatientService>(
  CONTAINER_IDENTIFIER.IPATIENT_SERVICE
);

export async function GET(request: NextRequest): Promise<any> {
  const searchParams = request.nextUrl.searchParams;
  const sortBy = searchParams.get("sortBy") || "created_at";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const page = parseInt(searchParams.get("page"), 10) || 1; // Default to page 1 if not provided or invalid
  const pageSize = parseInt(searchParams.get("pageSize"), 10) || 10; // Default to page size of 10 if not provided or invalid

  const options = { sortBy, sortOrder, page, pageSize };

  const result = await patientService.getPatients(options);
  
  return NextResponse.json(result, { status: result.status });
}

export async function POST(request: Request) {
  const body = await request.json();

  const result = await patientService.createPatient(body);

  return NextResponse.json(result, { status: result.status });
}
