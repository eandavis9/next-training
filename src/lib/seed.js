const { conn } = require('./db');

async function seed() {
  try {
    console.log('Starting data seeding...');
    // Acquire a client from the connection pool
    const client = await conn.connect();

    await client.query('BEGIN');

    // Define the seed data insertion query
    const insertQuery = `
      INSERT INTO patients (first_name, last_name, birthdate, address, contact_number, email_address, gender, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    // Sample patient data
    const patientsData = [
      ['John', 'Doe', '1990-01-01', '123 Main St', '09123456789', 'john@example.com', 'M', new Date(), new Date()],
      ['Jane', 'Doe', '1995-05-15', '456 Elm St', '09234567890', 'jane@example.com', 'F', new Date(), new Date()]
      // Add more sample data as needed
    ];

    // Iterate over the sample data and insert into the patients table
    for (const patient of patientsData) {
      await client.query(insertQuery, patient);
    }

    await client.query('COMMIT');
    console.log('Seed data inserted successfully');
    
    // Release the client back to the connection pool
    client.release();
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed().catch(console.error);