import { fetchPatients } from "@/app/api";
import { sortItemsByColumn } from '@/_shared/utils/sort'

const mockData =  [{ ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
{ ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
{ ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'}]

describe('fetchPatients', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });
  
    afterEach(() => {
      global.fetch.mockRestore();
    });
    
    it('returns the correct fields from the API endpoint', async () => {
        const responseData = {
          success: true,
          data: mockData,
          totalCount: 3,
        };
      
        // Mock the fetch function
        global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(responseData),
        });
      
        // Call fetchPatients function
        const response = await fetchPatients();
        const json = await response.json();
      
        // Assert that the result contains the expected fields
        expect(json.data).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ ID: expect.any(String) }),
            expect.objectContaining({ patient_name: expect.any(String) }),
            expect.objectContaining({ dentist_name: expect.any(String) }),
            expect.objectContaining({ last_visit: expect.any(String) }),
            expect.objectContaining({ last_service: expect.any(String) }),
          ])
        );
    });

    it('sorts patients by ID in ascending order', async () => {
        // Mock response data
        const responseData = {
          success: true,
          data: mockData,
          totalCount: 3,
        };
      
        // Mock the fetch function to return a resolved promise with response data
        global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(responseData),
        });
      
        // Call fetchPatients function and get the response data
        const response = await fetchPatients({ sortBy: "ID", sortOrder: "asc" });
        const json = await response.json();
        const sortedData = sortItemsByColumn(json?.data, 'ID', 'asc')
      
        // Assert that the sorted data is in ascending order by ID
        expect(sortedData).toEqual([
          { ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
          { ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'},
          { ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
        ]);
    });

    it('sorts patients by ID in descending order', async () => {
        // Mock response data
        const responseData = {
            success: true,
            data: mockData,
            totalCount: 3,
        };
      
        // Mock the fetch function to return a resolved promise with response data
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(responseData),
        });
      
        // Call fetchPatients function and get the response data
        const response = await fetchPatients({ sortBy: "ID", sortOrder: "desc" });
        const json = await response.json();
        const sortedData = sortItemsByColumn(json?.data, 'ID', 'desc')
      
        // Assert that the sorted data is in ascending order by ID
        expect(sortedData).toEqual([
            { ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
            { ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'},
            { ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
        ]);
    });

    it('sorts patients by patient_name in ascending order', async () => {
        // Mock response data
        const responseData = {
            success: true,
            data: mockData,
            totalCount: 3,
        };
      
        // Mock the fetch function to return a resolved promise with response data
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(responseData),
        });
      
        // Call fetchPatients function and get the response data
        const response = await fetchPatients({ sortBy: "patient_name", sortOrder: "asc" });
        const json = await response.json();
        const sortedData = sortItemsByColumn(json?.data, 'patient_name', 'asc')
      
        // Assert that the sorted data is in ascending order by patient_name
        expect(sortedData).toEqual([
            { ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'},
            { ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
            { ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
        ]);
    });

    it('sorts patients by patient_name in descending order', async () => {
        // Mock response data
        const responseData = {
            success: true,
            data: mockData,
            totalCount: 3,
        };
      
        // Mock the fetch function to return a resolved promise with response data
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(responseData),
        });
      
        // Call fetchPatients function and get the response data
        const response = await fetchPatients({ sortBy: "patient_name", sortOrder: "desc" });
        const json = await response.json();
        const sortedData = sortItemsByColumn(json?.data, 'patient_name', 'desc')
      
        // Assert that the sorted data is in descending order by patient_name
        expect(sortedData).toEqual([
            { ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
            { ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
            { ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'},
        ]);
    });

    it('sorts patients by dentist_name in ascending order', async () => {
        // Mock response data
        const responseData = {
            success: true,
            data: mockData,
            totalCount: 3,
        };
      
        // Mock the fetch function to return a resolved promise with response data
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(responseData),
        });
      
        // Call fetchPatients function and get the response data
        const response = await fetchPatients({ sortBy: "dentist_name", sortOrder: "asc" });
        const json = await response.json();
        const sortedData = sortItemsByColumn(json?.data, 'dentist_name', 'asc')
      
        // Assert that the sorted data is in descending order by patient_name
        expect(sortedData).toEqual([
            { ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'},
            { ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
            { ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'}
        ]);
    });

    it('sorts patients by dentist_name in descending order', async () => {
        // Mock response data
        const responseData = {
            success: true,
            data: mockData,
            totalCount: 3,
        };
      
        // Mock the fetch function to return a resolved promise with response data
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(responseData),
        });
      
        // Call fetchPatients function and get the response data
        const response = await fetchPatients({ sortBy: "dentist_name", sortOrder: "desc" });
        const json = await response.json();
        const sortedData = sortItemsByColumn(json?.data, 'dentist_name', 'desc')
      
        // Assert that the sorted data is in descending order by dentist_name
        expect(sortedData).toEqual([
            { ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
            { ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
            { ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'}
        ]);
    });

    it('sorts patients by last_visit in ascending order', async () => {
        // Mock response data
        const responseData = {
            success: true,
            data: mockData,
            totalCount: 3,
        };
      
        // Mock the fetch function to return a resolved promise with response data
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(responseData),
        });
      
        // Call fetchPatients function and get the response data
        const response = await fetchPatients({ sortBy: "last_service", sortOrder: "asc" });
        const json = await response.json();
        const sortedData = sortItemsByColumn(json?.data, 'last_service', 'asc')
      
        // Assert that the sorted data is in ascending order by last_service
        expect(sortedData).toEqual([
            { ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'},
            { ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
            { ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
        ]);
    });

    it('fetches patients with pagination', async () => {
        // Mock response data for the first page
        const responsePage1 = {
            success: true,
            data: [mockData[0], mockData[1]], // First 2 items for page 1
            totalCount: 3,
        };

        // Mock response data for the second page
        const responsePage2 = {
            success: true,
            data: [mockData[2]], // Third item for page 2
            totalCount: 3,
        };

        // Mock the fetch function to return different responses based on pagination parameters
        global.fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(responsePage1),
        }).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce(responsePage2),
        });
      
        // Call fetchPatients function with pagination for the first page
        let response = await fetchPatients({ sortBy: "ID", sortOrder: "asc", page: 1, pageSize: 2 });
        let json = await response.json();

        // Assert that the correct pagination parameters are sent in the API request for the first page
        let urlSearchParams = new URLSearchParams(global.fetch.mock.calls[0][0].split('?')[1]);
        expect(urlSearchParams.get('page')).toBe('1');
        expect(urlSearchParams.get('pageSize')).toBe('2');
      
        // Assert that the response contains the correct data for the first page
        expect(json.data).toHaveLength(2); // Check if only 2 items are returned due to pagination
        expect(json.totalCount).toBe(3); // Check if total count is correct

        // Call fetchPatients function with pagination for the second page
        response = await fetchPatients({ sortBy: "ID", sortOrder: "asc", page: 2, pageSize: 2 });
        json = await response.json();

        // Assert that the correct pagination parameters are sent in the API request for the second page
        urlSearchParams = new URLSearchParams(global.fetch.mock.calls[1][0].split('?')[1]);
        expect(urlSearchParams.get('page')).toBe('2');
        expect(urlSearchParams.get('pageSize')).toBe('2');
      
        // Assert that the response contains the correct data for the second page
        expect(json.data).toHaveLength(1); // Check if only 1 item is returned for the second page
        expect(json.totalCount).toBe(3); // Check if total count is correct
    });
});