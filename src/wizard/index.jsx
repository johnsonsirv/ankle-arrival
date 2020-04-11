import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import * as dispatchActions from '../actions';
import WizardSteps from './wizardSteps';
import InjuryPage from './injury';
import SymptomsPage from './symptoms';
import BioPage from './bio';
import Button from '../components/forms/inputs/button';
import DiagnosisPage from './diagnosis';

const mapStateToProps = state => state;

export const Wizard = props => {
  const [wizard, setWizard] = useState({
    showUserBioPage: false,
    init: true,
    selectedInjury: null,
    userBio: {
      fullname: '',
      age: '',
      height: '',
    },
  });

  const handleStartDiagnosis = () => {
    props.fetchInjuries();
    wizard.init = false;
    setWizard(wizard);
  };

  const handleShowSymptoms = () => {
    props.fetchSymptoms();
  };

  const handleShowBioPage = () => {
    wizard.showUserBioPage = true;
    setWizard(wizard);
  };

  const handleSubmitDiagnosis = () => {
    props.fetchDiagnosis();
    wizard.showUserBioPage = true;
    setWizard(wizard);
  };

  const handleRestartDiagnosis = () => {
    wizard.init = true;
    setWizard(wizard);
  };

  const handleChange = () => {};

  const handleClickSymptoms = () => {};

  const { isFetching, injuries, symptoms, diagnosis } = props;
  return (
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      {wizard.init && (
        <>
          <WizardSteps />
          <Button
            onClick={handleStartDiagnosis}
            value="Start Diagnosis"
            disabled={!wizard.init}
            id="step-1-start-diagnosis"
          />
        </>
      )}
      {injuries && (
        <>
          <InjuryPage injuries={injuries} onChange={handleChange} />
          <Button
            onClick={handleShowSymptoms}
            value="Next"
            disabled={!injuries}
            id="step-2-symptoms"
          />
        </>
      )}
      {symptoms && (
        <>
          <SymptomsPage symptoms={symptoms} onClick={handleClickSymptoms} />
          <Button
            onClick={handleShowBioPage}
            value="Next"
            disabled={!symptoms}
            id="step-3-bio"
          />
        </>
      )}
      {wizard.showUserBioPage && (
        <>
          <BioPage userBio={wizard.userBio} onInputChange={handleChange} />
          <Button
            onClick={handleSubmitDiagnosis}
            value="Submit"
            disabled={!wizard.showUserBioPage}
            id="step-4-submit"
          />
        </>
      )}
      {diagnosis && (
        <>
          <DiagnosisPage diagnosis={diagnosis} />
          <Button
            onClick={handleRestartDiagnosis}
            value="Re-start Diagnosis"
            id="step-5-restart-diagnosis"
          />
        </>
      )}
    </>
  );
};

Wizard.propTypes = {
  fetchSymptoms: PropTypes.func.isRequired,
  fetchInjuries: PropTypes.func.isRequired,
  fetchDiagnosis: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  injuries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.number,
      name: PropTypes.string,
    }).isRequired
  ).isRequired,
  symptoms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      description: PropTypes.string,
    }).isRequired
  ).isRequired,
  diagnosis: PropTypes.shape({
    id: PropTypes.number,
    injury: PropTypes.string,
    disease: PropTypes.string,
    symptoms: PropTypes.string,
    player: PropTypes.string,
    inference: PropTypes.string,
    treatment: PropTypes.string,
    lifestyle: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(Wizard);
