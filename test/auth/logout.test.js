/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Logoout from '../../src/auth/logout';

function setup() {

  const enzymeWrapper = shallow(<Logoout />);

  return { enzymeWrapper };
}

describe('<Logoout /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
