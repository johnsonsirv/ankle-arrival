/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import WizardSteps from '../../src/wizard/wizardSteps';

function setup() {
  const enzymeWrapper = shallow(<WizardSteps />);

  return { props, enzymeWrapper };
}

describe('<WizardSteps /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
