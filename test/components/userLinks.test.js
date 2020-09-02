/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { UserLinks } from '../../src/containers/userLinks';

function setup() {
  const props = {
    currentUser: {
      isAuthenticated: false,
    },
    getCurrentUser: jest.fn(),
  };
  const enzymeWrapper = shallow(<UserLinks {...props} />);

  return { props, enzymeWrapper };
}

describe('<UserLinks /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });

});
