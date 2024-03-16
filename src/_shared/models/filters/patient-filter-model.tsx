export interface PatientQueryOptions {
    sortBy: string; // Field to sort by
    sortOrder: string;
    page: number; // Page number
    pageSize: number; // Number of items per page
}