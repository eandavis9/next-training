export const fetchPatients = async ({
  sortBy = "first_name",
  sortOrder = "asc",
  page = 1,
  pageSize = 5,
} = {}) => {
  const params = new URLSearchParams({
    sortBy,
    sortOrder,
    page: String(page),
    pageSize: String(pageSize),
  });
  const url = `/api/patients?${params.toString()}`;

  const response = await fetch(url);
  
  return response;
};

export const addPatient = async (patientData: any) => {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patientData),
  });
  
  return response;
};
