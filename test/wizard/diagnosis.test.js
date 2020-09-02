/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import DiagnosisPage from '../../src/wizard/diagnosis';

function setup() {
  const props = {
    diagnosis: {
      id: 18,
      injury: 'abdominal',
      disease: 'blunt abdominal injury',
      symptoms: 'excessive abdominal',
      player: 'Joe Smith',
      inference:
        'if player exhibits symptoms excessive abdominal, in abdominal affected area, then there is a blunt abdominal injury disease.',
      treatment: 'surgery',
      lifestyle: 'maintain healthy lifestyle',
    },
  };

  const enzymeWrapper = shallow(<DiagnosisPage {...props} />);
  return { props, enzymeWrapper };
}

describe('<DiagnosisPage /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
