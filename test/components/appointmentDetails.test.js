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
  };
  const enzymeWrapper = shallow(<AppointmentDetails {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}
describe('<AppointmentDetails /> rendering', () => {
  const {
    enzymeWrapper,
  } = setup();
  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
