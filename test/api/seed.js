const faker = require('faker');

const generateSeed = () => {
  const noOfDoctorsToGenerate = 3;
  const doctors = [];

  for (let id = 1; id <= noOfDoctorsToGenerate; id += 1) {
    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const city = faker.address.city();
    const email = faker.internet.email();
    const username = faker.internet.userName();

    doctors.push(
      JSON.stringify({
        id,
        firstname,
        lastname,
        city,
        email,
        username,
      })
    );
  }

  // Generate Appointments
  const currentUser = {
    id: 1,
    username: faker.internet.userName(),
    token: '12345',
  };
  const currentUserAppointments = [];
  const nofOfAppointmentsToGenerate = 2;
  for (let id = 1; id <= nofOfAppointmentsToGenerate; id += 1) {
    const dateOfAppointment = '2020/03/22';
    const timeOfAppointment = '1:00PM';
    const doctor_firstname = faker.name.firstName();
    const doctor_lastname = faker.name.lastName();

    currentUserAppointments.push(
        id,
        dateOfAppointment,
        timeOfAppointment,
        doctor_firstname,
        doctor_lastname,
        userId: currentUser.id,
    );
  }

  return {
    "doctors": doctors,
    "appointments": currentUserAppointments,
  };
};
console.log(generateSeed());
module.exports = generateSeed;
