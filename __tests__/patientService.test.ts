import { getPatients } from '@/services/patientService';

describe('getPatients', () => {
    it('should return patients from the database', async () => {
        // Mock the database connection and query function
        const mockQuery = jest.fn().mockResolvedValue({
            rows: [{ id: 1, first_name: 'John' }, { id: 2, first_name: 'Taylor' }],
        });
        jest.mock('pg', () => ({
            Pool: jest.fn().mockImplementation(() => ({
                query: mockQuery,
            })),
        }));

        // Call the function
        const options = { sortBy: 'id', sortOrder:'ASC' , page: 1, pageSize: 2 };
        const patients = await getPatients(options);

        // Assertions
        expect(patients).toHaveLength(2);
        expect(patients[0].id).toBe(1);
        expect(patients[1].id).toBe(2);
        // expect(mockQuery).toHaveBeenCalled();
    });
});