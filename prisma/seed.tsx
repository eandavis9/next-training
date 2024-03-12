import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
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
  
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})