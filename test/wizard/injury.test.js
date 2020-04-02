/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import InjuryPage from '../../src/wizard/injury';

function setup() {
  const props = {
    name: 'injuries',
    onChange: jest.fn(),
    injuries: [
      { id: 1, name: 'abdominal', code: 1 },
      { id: 2, name: 'bone', code: 2 },
    ],
  };

  const enzymeWrapper = shallow(<InjuryPage {...props} />);
  return { props, enzymeWrapper };
}

describe('<InjuryPage /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
