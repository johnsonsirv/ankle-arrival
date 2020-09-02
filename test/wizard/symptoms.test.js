/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import SymptomsPage from '../../src/wizard/symptoms';

function setup() {
  const props = {
    name: 'symptoms',
    onChange: jest.fn(),
    symptoms: [{ id: 5, code: 'a14', description: 'excessive abdominal' }],
  };

  const enzymeWrapper = shallow(<SymptomsPage {...props} />);
  return { props, enzymeWrapper };
}

describe('<SymptomsPage /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
