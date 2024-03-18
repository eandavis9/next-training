import { fetchPatients, addPatient  } from "@/app/api";
import { sortItemsByColumn } from '@/_shared/utils/sort'
import sinon from 'sinon'
import { ERRORS } from "@/_shared/constants/errors/error-messages";

const mockData =  [{ ID: "P-3", patient_name: 'John Doe', dentist_name: 'Dr. Something', last_visit: '2023-12-13', last_service: 'Root Canal'},
{ ID: "P-1", patient_name: 'Jane Smith', dentist_name: 'Dr. Someone', last_visit: '2023-12-15', last_service: 'Filling'},
{ ID: "P-2", patient_name: 'Alice Johnson', dentist_name: 'Dr. Anyone', last_visit: '2023-12-10', last_service: 'Cleaning'}]

let options = {
   sortBy: 'first_name',
   sortOrder: 'asc',
   page: 1,
   pageSize: 5
};

let patientStub: any

describe('Patient API', () => {
    beforeEach(() => {
        patientStub = sinon.stub(global, 'fetch');
    });
    afterEach(() => {
        sinon.restore();
    });

    test('should fetch patients successfully with default parameters', async () => {
        // Stub the fetch function to resolve with mock data
        
        const sortedData = sortItemsByColumn(mockData, 'patient_name', 'asc')
        const fetchStub = patientStub.resolves(new Response(JSON.stringify({ success: true, data: sortedData, totalCount: mockData.length })))
        
        // Call the fetchPatients function
        const response = await fetchPatients();
       // const params = new URLSearchParams(options)
    
        // Check if fetch was called with the correct URL
        expect(fetchStub.calledOnce).toBe(true);
        expect(fetchStub.firstCall.args[0]).toContain('/api/patients');
        expect(fetchStub.firstCall.args[0]).toBe('/api/patients?sortBy=first_name&sortOrder=asc&page=1&pageSize=5');

        const mockPatients = sortItemsByColumn(mockData, 'patient_name', 'asc')
    
        // Check if the response contains the expected data
        const responseData = await response.json();
        expect(responseData).toHaveProperty('success', true);
        expect(responseData).toHaveProperty('data');
        expect(Array.isArray(responseData.data)).toBe(true);
        expect(responseData).toHaveProperty('totalCount', mockData.length);
        expect(responseData.data.length).toBe(mockData.length); 
        expect(responseData.data).toEqual(mockPatients);
        expect(responseData.data).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ ID: expect.any(String) }),
              expect.objectContaining({ patient_name: expect.any(String) }),
              expect.objectContaining({ dentist_name: expect.any(String) }),
              expect.objectContaining({ last_visit: expect.any(String) }),
              expect.objectContaining({ last_service: expect.any(String) }),
            ])
        );
    });


    test('should return unexpected error when providing invalid value for sortOrder', async () => {
        // Stub the fetch function to resolve with mock data
        
        const fetchStub = patientStub.resolves(new Response(JSON.stringify({ success: false, errorCode: ERRORS.unexpectedError }), { status: 500 }));
        
        // Call the fetchPatients function
        const response = await fetchPatients({ sortOrder: 'descsfsdfs'});

        const params = new URLSearchParams(fetchStub.firstCall.args[0].split('?')[1]);
    
        expect(fetchStub.calledOnce).toBe(true);

        expect(fetchStub.firstCall.args[0]).toContain('/api/patients');

        // Check if fetch was called with the wrong sortOrder value
        expect(params.get('sortOrder')).not.toBe('desc');
        expect(response.status).toBe(500);
    
        // Check if the response contains the expected data
        const responseData = await response.json();
        expect(responseData).toHaveProperty('success', false);
    });

    test('should sort patients by name in descending order ', async () => {
        // Stub the fetch function to resolve with mock data
        
        const sortedData = sortItemsByColumn(mockData, 'patient_name', 'desc')
        const fetchStub = patientStub.resolves(new Response(JSON.stringify({ success: true, data: sortedData, totalCount: mockData.length })))
        
        // Call the fetchPatients function
        const response = await fetchPatients({ sortOrder: 'desc'});


        // expect(fetchStub.firstCall.args[0]).toBe(`/api/patients?${params.toString()}`);
        const mockPatients = sortItemsByColumn(mockData, 'patient_name', 'desc')
        

        // Check if fetch was called with the correct URL
        expect(fetchStub.calledOnce).toBe(true);
        expect(fetchStub.firstCall.args[0]).toContain('/api/patients');
        expect(fetchStub.firstCall.args[0]).toBe('/api/patients?sortBy=first_name&sortOrder=desc&page=1&pageSize=5');

        // Check if the response contains the expected data
        const responseData = await response.json();
        expect(responseData).toHaveProperty('success', true);
        expect(responseData).toHaveProperty('data');
        expect(Array.isArray(responseData.data)).toBe(true);
        expect(responseData).toHaveProperty('totalCount', mockData.length);
        expect(responseData.data.length).toBe(mockData.length); 
        expect(responseData.data).toEqual(mockPatients);
    });


    test('should sort patients by ID in ascending order ', async () => {
        // Stub the fetch function to resolve with mock data
        
        const sortedData = sortItemsByColumn(mockData, 'ID', 'asc')
        const fetchStub = patientStub.resolves(new Response(JSON.stringify({ success: true, data: sortedData, totalCount: mockData.length })))
        
        // Call the fetchPatients function
        const response = await fetchPatients({ sortBy: 'id', sortOrder: 'asc'});

        const mockPatients = sortItemsByColumn(mockData, 'ID', 'asc')
        const responseData = await response.json();
    
        // Check if fetch was called with the correct URL
        expect(fetchStub.calledOnce).toBe(true);
        expect(fetchStub.firstCall.args[0]).toContain('/api/patients');
        expect(fetchStub.firstCall.args[0]).toBe('/api/patients?sortBy=id&sortOrder=asc&page=1&pageSize=5');

        // Check if the response contains the expected data
      
        expect(responseData).toHaveProperty('success', true);
        expect(responseData).toHaveProperty('data');
        expect(Array.isArray(responseData.data)).toBe(true);
        expect(responseData).toHaveProperty('totalCount', mockData.length);
        expect(responseData.data.length).toBe(mockData.length); 
        expect(responseData.data).toEqual(mockPatients);
    });

    test('should sort patients by ID in descending order ', async () => {
        // Stub the fetch function to resolve with mock data
        
        const sortedData = sortItemsByColumn(mockData, 'ID', 'desc')
        const fetchStub = patientStub.resolves(new Response(JSON.stringify({ success: true, data: sortedData, totalCount: mockData.length })))
        
        // Call the fetchPatients function
        const response = await fetchPatients({ sortBy: 'id', sortOrder: 'desc'});


        // expect(fetchStub.firstCall.args[0]).toBe(`/api/patients?${params.toString()}`);
        const mockPatients = sortItemsByColumn(mockData, 'ID', 'desc')
        

        // Check if fetch was called with the correct URL
        expect(fetchStub.calledOnce).toBe(true);
        expect(fetchStub.firstCall.args[0]).toContain('/api/patients');
        expect(fetchStub.firstCall.args[0]).toBe('/api/patients?sortBy=id&sortOrder=desc&page=1&pageSize=5');

        // Check if the response contains the expected data
        const responseData = await response.json();
        expect(responseData).toHaveProperty('success', true);
        expect(responseData).toHaveProperty('data');
        expect(Array.isArray(responseData.data)).toBe(true);
        expect(responseData).toHaveProperty('totalCount', mockData.length);
        expect(responseData.data.length).toBe(mockData.length); 
        expect(responseData.data).toEqual(mockPatients);
    });
    
    test('should fetch patients with pagination', async () => {
        // Mock response data for the first page
        const responsePage1 = {
            success: true,
            data: [mockData[0], mockData[1]],
            totalCount: 3,
        };
    
        // Mock response data for the second page
        const responsePage2 = {
            success: true,
            data: [mockData[2]],
            totalCount: 3,
        };
    
        // Stub the fetch function to return different responses based on pagination parameters
        const fetchStub = patientStub
            .onFirstCall().resolves(new Response(JSON.stringify(responsePage1)))
            .onSecondCall().resolves(new Response(JSON.stringify(responsePage2)));
        
        // Call fetchPatients function with pagination for the first page
        let response = await fetchPatients({ sortBy: 'id', sortOrder: 'asc', page: 1, pageSize: 2 });
        let json = await response.json();
    
        // Assert that the correct pagination parameters are sent in the API request for the first page
        let urlSearchParams = new URLSearchParams(fetchStub.firstCall.args[0].split('?')[1]);
        expect(urlSearchParams.get('page')).toBe('1');
        expect(urlSearchParams.get('pageSize')).toBe('2');
    
        // Assert that the response contains the correct data for the first page
        expect(json.data).toHaveLength(2); // Check if only 2 items are returned due to pagination
        expect(json.totalCount).toBe(3); // Check if total count is correct
    
        // Call fetchPatients function with pagination for the second page
        response = await fetchPatients({ sortBy: 'id', sortOrder: 'asc', page: 2, pageSize: 2 });
        json = await response.json();
    
        // Assert that the correct pagination parameters are sent in the API request for the second page
        urlSearchParams = new URLSearchParams(fetchStub.secondCall.args[0].split('?')[1]);
        expect(urlSearchParams.get('page')).toBe('2');
        expect(urlSearchParams.get('pageSize')).toBe('2');
    
        // Assert that the response contains the correct data for the second page
        expect(json.data).toHaveLength(1); // Check if only 1 item is returned for the second page
        expect(json.totalCount).toBe(3); // Check if total count is correct
    });
    
});