/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Doctor from '../../src/components/doctor';

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
});