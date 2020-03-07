/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { MemoryRouter } from 'react-router-dom';
import Doctor from '../../src/components/doctor';
import { BookAppointment } from '../../src/containers/bookAppointment';

function setup() {
  const props = {
    doctor: {
      id: 1,
      firstname: 'Larry',
      lastname: 'Page',
      email: 'example@larry.com',
      city: 'NY',
      username: 'larryp123',
    },
    currentUser: {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    },
  };

  const enzymeWrapper = shallow(<Doctor {...props} />);

  return { props, enzymeWrapper };
}

describe('<Doctor /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should require a doctor prop', () => {
    expect(enzymeWrapper.find('div').text()).toMatch(/Larry Page/);
  });
  it('should render 1 <a> to book appointment', () => {
    expect(enzymeWrapper.find('Link').text()).toMatch(/Book Appointment/);
  });
});

describe('<Doctor /> routing', () => {
  const { props } = setup();
  it('should render BookAppointment component for "/book-appointment/:username route"', () => {
    const entry = `/book-appointement/${props.doctor.username}`;
    const wrapper = mount(
      <MemoryRouter initialEntries={[entry]}>
        <BookAppointment {...props} />
      </MemoryRouter>
    );
    expect(wrapper.find(BookAppointment)).toHaveLength(1);
  });
});
