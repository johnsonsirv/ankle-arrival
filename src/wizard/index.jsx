import React, { useState, useEffect } from 'react';
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
    init: true,
    selectedInjury: null,
    checkedItems: new Map(),
    guestBio: {
      firstName: 'Guest',
    },
  });

  const handleStartDiagnosis = () => {
    props.wizardFetchInjuries();
    wizard.init = false;
    setWizard({ ...wizard });
  };

  const handleShowSymptoms = () => {
    props.wizardFetchSymptoms(wizard.selectedInjury);
  };

  const handleShowBioPage = () => {
    props.wizardShowBioPage(wizard.selectedInjury);
  };

  const handleSubmitDiagnosis = () => {
    // props.wizardFetchDiagnosis();
    console.log(wizard);
  };

  const handleRestartDiagnosis = () => {
    wizard.init = true;
    setWizard({ ...wizard });
  };

  const handleSelectInjury = ({ target: input }) => {
    wizard.selectedInjury = input.value;
    setWizard({ ...wizard });
  };

  const handleChange = ({ target: input }) => {
    wizard.guestBio[input.name] = input.value || 'Guest';
    setWizard({ ...wizard });
  };

  const handleChooseSymptoms = ({ target: input }) => {
    wizard.checkedItems.set(input.name, input.checked);
  };

  const handleShowPrevious = previous => {
    props.wizardPreviousStep(previous);
  };

  const {
    wizard: { isFetching, injuries, symptoms, diagnosis, next },
  } = props;

  const { firstName } = wizard.guestBio;

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
      {next && next.injury && (
        <>
          <InjuryPage injuries={injuries} onChange={handleSelectInjury} />
          <Button
            onClick={handleShowSymptoms}
            value="Next"
            disabled={!injuries}
            id="step-2-symptoms"
          />
        </>
      )}
      {next && next.symptoms && (
        <>
          {wizard.checkedItems.clear()}
          <SymptomsPage symptoms={symptoms} onChange={handleChooseSymptoms} />
          <Button
            onClick={() => handleShowPrevious({ title: 'injury' })}
            value="Back"
            disabled={!symptoms}
            id="back-to-step-2-injury"
          />
          <Button
            onClick={handleShowBioPage}
            value="Next"
            // disabled={!symptoms}
            id="step-3-bio"
          />
        </>
      )}
      {next && next.bio && (
        <>
          <BioPage guestName={firstName} onInputChange={handleChange} />
          <Button
            onClick={() => handleShowPrevious({ title: 'symptoms' })}
            value="Back"
            // disabled={!symptoms}
            id="back-to-step-3-symptoms"
          />
          <Button
            onClick={handleSubmitDiagnosis}
            value="Submit"
            // disabled={!wizard.showUserBioPage}
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

Wizard.defaultProp = {
  next: null,
};

Wizard.propTypes = {
  wizardFetchSymptoms: PropTypes.func.isRequired,
  wizardFetchInjuries: PropTypes.func.isRequired,
  wizardFetchDiagnosis: PropTypes.func.isRequired,
  wizardPreviousStep: PropTypes.func.isRequired,
  wizardShowBioPage: PropTypes.func.isRequired,
  wizard: PropTypes.shape({
    injuries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    symptoms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.string,
        description: PropTypes.string,
      })
    ),
    diagnosis: PropTypes.shape({
      id: PropTypes.number,
      injury: PropTypes.string,
      disease: PropTypes.string,
      symptoms: PropTypes.string,
      player: PropTypes.string,
      inference: PropTypes.string,
      treatment: PropTypes.string,
      lifestyle: PropTypes.string,
    }),
    isFetching: PropTypes.bool.isRequired,
    next: PropTypes.object,
  }).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(Wizard);
