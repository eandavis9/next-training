import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


async function main() {
  try {

    const patientsData = [
      {
        first_name: 'John',
        last_name: 'Doe',
        birthdate: new Date('1990-01-01'),
        address: '123 Main St',
        contact_number: '09123456789',
        email_address: 'john@example.com',
        gender: 'M',
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        birthdate: new Date('1995-05-15'),
        address: '456 Elm St',
        contact_number: '09234567890',
        email_address: 'jane@example.com',
        gender: 'F',
      },
      {
        first_name: 'Alice',
        last_name: 'Smith',
        birthdate: new Date('1988-07-20'),
        address: '789 Oak St',
        contact_number: '09345678901',
        email_address: 'alice@example.com',
        gender: 'F',
      },
      {
        first_name: 'Bob',
        last_name: 'Johnson',
        birthdate: new Date('1975-03-10'),
        address: '101 Pine St',
        contact_number: '09456789012',
        email_address: 'bob@example.com',
        gender: 'M',
      },
      {
        first_name: 'Emily',
        last_name: 'Brown',
        birthdate: new Date('1992-11-25'),
        address: '222 Maple St',
        contact_number: '09567890123',
        email_address: 'emily@example.com',
        gender: 'F',
      },
      {
        first_name: 'Michael',
        last_name: 'Wilson',
        birthdate: new Date('1983-09-05'),
        address: '333 Cedar St',
        contact_number: '09678901234',
        email_address: 'michael@example.com',
        gender: 'M',
      },
      {
        first_name: 'Emma',
        last_name: 'Jones',
        birthdate: new Date('1979-06-15'),
        address: '444 Birch St',
        contact_number: '09789012345',
        email_address: 'emma@example.com',
        gender: 'F',
      },
      {
        first_name: 'James',
        last_name: 'Taylor',
        birthdate: new Date('1998-02-28'),
        address: '555 Walnut St',
        contact_number: '09890123456',
        email_address: 'james@example.com',
        gender: 'M',
      },
      {
        first_name: 'Olivia',
        last_name: 'Lee',
        birthdate: new Date('1986-04-12'),
        address: '666 Pine St',
        contact_number: '09901234567',
        email_address: 'olivia@example.com',
        gender: 'F',
      },
      {
        first_name: 'Daniel',
        last_name: 'Clark',
        birthdate: new Date('1970-12-03'),
        address: '777 Elm St',
        contact_number: '09112345678',
        email_address: 'daniel@example.com',
        gender: 'M',
      },
  ];

  // Insert seed data into the database
  await prisma.patient.createMany({
      data: patientsData,
  });
  
    // Seed Dentists
    const dentistsData = [
      {
        first_name: 'Alice',
        last_name: 'Smith',
        birthdate: new Date('1980-01-15'),
        address: '123 Main St',
        contact_number: '09123456789',
        email_address: 'alice@example.com',
        gender: 'F',
      },
      {
        first_name: 'Bob',
        last_name: 'Johnson',
        birthdate: new Date('1975-08-20'),
        address: '456 Elm St',
        contact_number: '09234567890',
        email_address: 'bob@example.com',
        gender: 'M',
      },
      {
        first_name: 'Carol',
        last_name: 'Williams',
        birthdate: new Date('1982-05-10'),
        address: '789 Oak St',
        contact_number: '09345678901',
        email_address: 'carol@example.com',
        gender: 'F',
      },
      {
        first_name: 'David',
        last_name: 'Brown',
        birthdate: new Date('1978-12-25'),
        address: '101 Pine St',
        contact_number: '09456789012',
        email_address: 'david@example.com',
        gender: 'M',
      },
      {
        first_name: 'Emma',
        last_name: 'Garcia',
        birthdate: new Date('1985-03-30'),
        address: '222 Maple St',
        contact_number: '09567890123',
        email_address: 'emma@example.com',
        gender: 'F',
      },
      {
        first_name: 'Frank',
        last_name: 'Martinez',
        birthdate: new Date('1973-10-05'),
        address: '333 Cedar St',
        contact_number: '09678901234',
        email_address: 'frank@example.com',
        gender: 'M',
      },
      {
        first_name: 'Grace',
        last_name: 'Gonzalez',
        birthdate: new Date('1988-07-20'),
        address: '444 Birch St',
        contact_number: '09789012345',
        email_address: 'grace@example.com',
        gender: 'F',
      },
      {
        first_name: 'Henry',
        last_name: 'Lopez',
        birthdate: new Date('1979-06-15'),
        address: '555 Walnut St',
        contact_number: '09890123456',
        email_address: 'henry@example.com',
        gender: 'M',
      },
      {
        first_name: 'Isabella',
        last_name: 'Perez',
        birthdate: new Date('1990-04-12'),
        address: '666 Pine St',
        contact_number: '09901234567',
        email_address: 'isabella@example.com',
        gender: 'F',
      },
      {
        first_name: 'Jack',
        last_name: 'Rodriguez',
        birthdate: new Date('1981-12-03'),
        address: '777 Elm St',
        contact_number: '09112345678',
        email_address: 'jack@example.com',
        gender: 'M',
      },
    ];

    await prisma.dentist.createMany({
      data: dentistsData,
    });

    // Seed PatientDentistHistory
    const patientDentistHistoryData = [
      {
        patient_id: 1,
        dentist_id: 1,
        service_name: 'Dental Checkup',
      },
      {
        patient_id: 2,
        dentist_id: 2,
        service_name: 'Tooth Extraction',
      },
      {
        patient_id: 3,
        dentist_id: 3,
        service_name: 'Teeth Cleaning',
      },
      {
        patient_id: 4,
        dentist_id: 4,
        service_name: 'Root Canal',
      },
      {
        patient_id: 5,
        dentist_id: 5,
        service_name: 'Dental Filling',
      },
      {
        patient_id: 6,
        dentist_id: 6,
        service_name: 'Wisdom Tooth Removal',
      },
      {
        patient_id: 7,
        dentist_id: 7,
        service_name: 'Braces Installation',
      },
      {
        patient_id: 8,
        dentist_id: 8,
        service_name: 'Gum Surgery',
      },
      {
        patient_id: 9,
        dentist_id: 9,
        service_name: 'Dental Implants',
      },
      {
        patient_id: 10,
        dentist_id: 10,
        service_name: 'Orthodontic Treatment',
      },
    ];

    await prisma.patientDentistHistory.createMany({
      data: patientDentistHistoryData,
    });

    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();