/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Doctor from '../../src/components/doctor';

function setup() {
  const props = {
    firstname: 'Larry',
    lastname: 'Page',
    email: 'example@larry.com',
    city: 'NY',
    username: 'larryp123',
  };

  const enzymeWrapper = shallow(<Doctor doctor={props} />);

  return { props, enzymeWrapper };
}

describe('<Doctor /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should require a prop', () => {
    const inputProps = enzymeWrapper.props();
    expect(inputProps).not.toBeNull();
  });
  it('should render 1 <a> to book appointment', () => {
    expect(enzymeWrapper.find('Link').text()).toMatch(/Book Appointment/);
  });
});
