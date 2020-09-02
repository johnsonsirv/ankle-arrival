/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { SocialLoginPanel } from '../../src/auth/socialLoginPanel';

function setup() {
  const props = {
    authenticateUser: jest.fn(),
  };

  const enzymeWrapper = shallow(<SocialLoginPanel {...props} />);

  return { props, enzymeWrapper };
}

describe('<SocialLoginPanel /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
