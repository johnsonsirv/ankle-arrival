/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
// import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Wizard } from '../../src/wizard/index';

function setup(stateProps = {}) {
  const props = {
    wizardFetchInjuries: jest.fn(),
    wizardFetchSymptoms: jest.fn(),
    wizardFetchDiagnosis: jest.fn(),
    wizardPreviousStep: jest.fn(),
    wizardShowBioPage: jest.fn(),
    wizard: {
      isFetching: false,
      injuries: [],
      symptoms: [],
      diagnosis: {},
      ...stateProps,
    },
  };

  const enzymeWrapper = shallow(<Wizard {...props} />);

  return { props, enzymeWrapper };
}

describe('<Wizard /> rendering', () => {
  const { enzymeWrapper, props } = setup();
  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 <Button> to start diagnosis', () => {
    expect(enzymeWrapper.find('#step-1-start-diagnosis')).toHaveLength(1);
  });
  it('should render <WizardSteps />', () => {
    expect(enzymeWrapper.find('WizardSteps')).toHaveLength(1);
  });
  it('should render <InjuryPage> when state changes', () => {
    const injuries = [
      { id: 1, name: 'abdominal', code: 1 },
      { id: 2, name: 'bone', code: 2 },
    ];
    const next = { injury: true };

    const { enzymeWrapper } = setup({ injuries, next });
    expect(enzymeWrapper.find('InjuryPage')).toHaveLength(1);
  });
  it('should render <SymptomsPage> when state changes', () => {
    const symptoms = [
      { id: 5, code: 'a14', description: 'excessive abdominal' },
    ];
    const next = { symptoms: true };
    const { enzymeWrapper } = setup({ symptoms, next });
    expect(enzymeWrapper.find('SymptomsPage')).toHaveLength(1);
  });
  it('should render <BioPage> when state changes', () => {
    const next = { bio: true };
    const { enzymeWrapper } = setup({ next });
    expect(enzymeWrapper.find('BioPage')).toHaveLength(1);
  });
  it('should render <DiagnosisPage> when state changes', () => {
    const diagnosis = {
      id: 18,
      injury: 'abdominal',
      disease: 'blunt abdominal injury',
      symptoms: 'excessive abdominal',
      player: 'Joe Smith',
      inference:
        'if player exhibits symptoms excessive abdominal, in abdominal affected area, then there is a blunt abdominal injury disease.',
      treatment: 'surgery',
      lifestyle: 'maintain healthy lifestyle',
    };
    const next = { diagnosis: true };
    const { enzymeWrapper } = setup({ diagnosis, next });
    expect(enzymeWrapper.find('DiagnosisPage')).toHaveLength(1);
  });
});

describe('<Wizard /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('STEP 1 <start-diagnosis> should dispatch wizardFetchInjuries action', () => {
    enzymeWrapper
      .find('#step-1-start-diagnosis')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.wizardFetchInjuries).toHaveBeenCalled();
  });
  it('STEP 2 <symptoms> should dispatch wizardFetchSymptoms action', () => {
    const injuries = [
      { id: 1, name: 'abdominal', code: 1 },
      { id: 2, name: 'bone', code: 2 },
    ];
    const next = { injury: true };
    const { props, enzymeWrapper } = setup({ injuries, next });
    enzymeWrapper
      .find('#step-2-symptoms')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.wizardFetchSymptoms).toHaveBeenCalled();
  });

  it('STEP 4 <submit> should dispatch wizardFetchDiagnosis', () => {
    const next = { bio: true };
    const { props, enzymeWrapper } = setup({ next });
    enzymeWrapper
      .find('#step-4-submit')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.wizardFetchDiagnosis).toHaveBeenCalled();
  });
});
