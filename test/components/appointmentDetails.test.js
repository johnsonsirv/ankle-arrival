/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import AppointmentDetails from '../../src/components/appointmentDetails';

function setup() {
  const props = {
    appointment: {
      id: 1,
      dateOfAppointment: '2020/03/22',
      timeOfAppointment: '12:00 PM',
      description: 'I need to discuss a surgery alternative',
      doctor_firstname: 'Larry',
      doctor_lastname: 'Page',
    },
    currentUser: {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    },
  };
  const enzymeWrapper = shallow(<AppointmentDetails {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}
describe('<AppointmentDetails /> rendering', () => {
  const {
    props: { appointment },
    enzymeWrapper,
  } = setup();
  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should receive dateOfAppointment props from parent component', () => {
    expect(enzymeWrapper.find('#date-of-appointment').text()).toEqual(
      `${appointment.dateOfAppointment}`
    );
  });
  it('should receive timeOfAppointment props from parent component', () => {
    expect(enzymeWrapper.find('#time-of-appointment').text()).toEqual(
      `${appointment.timeOfAppointment}`
    );
  });
  it('should receive description props from parent component', () => {
    expect(enzymeWrapper.find('#description-of-appointment').text()).toEqual(
      `${appointment.description}`
    );
  });
  it('should receive dooctor fullname props from parent component', () => {
    const fullname = `${appointment.doctor_firstname} ${appointment.doctor_lastname}`;
    expect(enzymeWrapper.find('#doctor-name').text()).toEqual(fullname);
  });
});
