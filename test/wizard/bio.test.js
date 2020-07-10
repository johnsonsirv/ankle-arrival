/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import BioPage from '../../src/wizard/bio';

function setup() {
  const props = {
    onInputChange: jest.fn(),
    guestName: 'Joe Smith',
  };

  const enzymeWrapper = shallow(<BioPage {...props} />);
  return { props, enzymeWrapper };
}

describe('<BioPage /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
