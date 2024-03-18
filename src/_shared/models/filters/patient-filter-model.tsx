export interface PatientQueryOptions {
    sortBy: string; // Field to sort by
    sortOrder: string;
    page: number | string; // Page number
    pageSize: number  | string; // Number of items per page
}