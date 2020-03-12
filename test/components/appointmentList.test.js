/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { AppointmentList } from '../../src/containers/appointmentList';

function setup() {
  const props = {
    appointments: [
      {
        id: 1,
        dateOfAppointment: '2020/03/22',
        timeOfAppointment: '12:00 PM',
        description: 'I need to discuss a surgery alternative',
        doctor_firstname: 'Larry',
        doctor_lastname: 'Page',
      },
      {
        id: 2,
        dateOfAppointment: '2020/04/02',
        timeOfAppointment: '1:00 PM',
        description: 'I thingk I may  loose my legs',
        doctor_firstname: 'Larry',
        doctor_lastname: 'Page',
      },
    ],
    isFetching: false,
    fetchAppointments: jest.fn(),
    getCurrentUser: jest.fn(),
    currentUser: {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    },
  };

  const enzymeWrapper = shallow(<AppointmentList {...props} />);

  return { props, enzymeWrapper };
}
describe('<AppointmentList /> rendering', () => {
  const { props, enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render subcomponent', () => {
    expect(enzymeWrapper.find('AppointmentDetails')).toHaveLength(2);
  });

  it('should pass down props to composed component', () => {
    const subcomponentProps = enzymeWrapper
      .find('AppointmentDetails')
      .first()
      .props();
    expect(subcomponentProps.appointment).toEqual(props.appointments[0]);
  });

  it('should pass down currentUser props to composed component', () => {
    const subcomponentProps = enzymeWrapper
      .find('AppointmentDetails')
      .first()
      .props();
    expect(subcomponentProps.currentUser).toEqual(props.currentUser);
  });

  it('should dispatch getCurrentUser in useEffect', () => {
    mount(<AppointmentList {...props} />);
    expect(props.getCurrentUser).toHaveBeenCalled();
  });

  it('should dispatch fetchAppointments in useEffect', () => {
    mount(<AppointmentList {...props} />);
    expect(props.fetchAppointments).toHaveBeenCalledWith(props.currentUser);
  });
});
