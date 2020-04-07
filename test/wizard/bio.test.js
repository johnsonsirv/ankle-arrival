/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import BioPage from '../../src/wizard/bio';

function setup() {
  const props = {
    onInputChange: jest.fn(),
    userBio: { age: '25', fullname: 'Joe Smith', height: '5.11' },
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
