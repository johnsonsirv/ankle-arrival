/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
// import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Wizard } from '../../src/wizard/index';

function setup(stateProps = {}) {
  const props = {
    fetchInjuries: jest.fn(),
    fetchSymptoms: jest.fn(),
    fetchDiagnosis: jest.fn(),
    isFetching: false,
    injuries: [],
    symptoms: [],
    diagnosis: {},
  };

  const enzymeWrapper = shallow(<Wizard {...props} {...stateProps} />);

  return { props, enzymeWrapper };
}

describe('<Wizard /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    // expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 <Button> to start diagnosis', () => {
    enzymeWrapper.state.init = true;
    expect(enzymeWrapper.find('#start-diagnosis')).toHaveLength(1);
  });
  it('should render <WizardSteps />', () => {
    enzymeWrapper.state.init = true;
    console.log(enzymeWrapper.state.wizard);
    expect(enzymeWrapper.find('WizardSteps')).toHaveLength(1);
  });
  it('should render <InjuryPage> when state changes', () => {
    const injuries = [
      { id: 1, name: 'abdominal', code: 1 },
      { id: 2, name: 'bone', code: 2 },
    ];
    const { enzymeWrapper } = setup({ injuries });
    expect(enzymeWrapper.find('InjuryPage')).toHaveLength(1);
  });
  it('should render <SymptomsPage> when state changes', () => {
    const symptoms = [
      { id: 5, code: 'a14', description: 'excessive abdominal' },
    ];
    const { enzymeWrapper } = setup({ symptoms });
    expect(enzymeWrapper.find('SymptomsPage')).toHaveLength(1);
  });
  it('should render <BioPage> when state changes', () => {
    enzymeWrapper.state.showUserBioPage = true;
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
    const { enzymeWrapper } = setup({ diagnosis });
    expect(enzymeWrapper.find('DiagnosisPage')).toHaveLength(1);
  });
});

describe('<Wizard /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('STEP 1 <start-diagnosis> should dispatch fetchInjuries action', () => {
    enzymeWrapper
      .find('#step-1-start-diagnosis')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.fetchInjuries).toHaveBeenCalled();
  });
  it('STEP 2 <symptoms> should dispatch fetchSymptoms action', () => {
    // const injuryAreas = [
    //   { id: 1, name: 'abdominal', code: 1 },
    //   { id: 2, name: 'bone', code: 2 },
    //   { id: 3, name: 'chest', code: 3 },
    //   { id: 4, name: 'head', code: 4 },
    //   { id: 5, name: 'muscle', code: 5 },
    //   { id: 6, name: 'skin', code: 6 },
    // ];
    // enzymeWrapper.state.data.injuries = injuryAreas;
    const injuries = [
      { id: 1, name: 'abdominal', code: 1 },
      { id: 2, name: 'bone', code: 2 },
    ];
    const { enzymeWrapper } = setup({ injuries });
    enzymeWrapper
      .find('#step-2-symptoms')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.fetchSymptoms).toHaveBeenCalled();
  });
  it('STEP 3 <bio> should set showUserBioPage to TRUE', () => {
    // const symptoms = [
    //   { id: 5, code: 'a14', description: 'excessive abdominal' },
    // ];
    // enzymeWrapper.state.data.symptoms = symptoms;
    const symptoms = [
      { id: 5, code: 'a14', description: 'excessive abdominal' },
    ];
    const { enzymeWrapper } = setup({ symptoms });
    enzymeWrapper
      .find('#step-3-bio')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(enzymeWrapper.wizard.data.showUserBioPage).toEqual(true);
  });

  it('STEP 4 <submit> should dispatch fetchDiagnosis', () => {
    enzymeWrapper.state.wizard.showUserBioPage = true;
    enzymeWrapper
      .find('#step-4-submit')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.fetchDiagnosis).toHaveBeenCalled();
  });
});
