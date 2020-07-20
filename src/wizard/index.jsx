import React, { useEffect, useState } from 'react';
import { Prompt } from 'react-router-dom';
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
    isBlocking: false,
    init: true,
    selectedInjury: null,
    checkedItems: new Map(),
    guestBio: {
      firstName: 'Guest',
    },
    passedInjuryValidation: false,
    passedSymptomsValidation: false,
  });

  const handleStartDiagnosis = () => {
    props.wizardFetchInjuries();
    wizard.init = false;
    wizard.isBlocking = true; // block navigation when diagnosis starts
    setWizard({ ...wizard });
  };

  const handleShowSymptoms = () => {
    props.wizardFetchSymptoms(wizard.selectedInjury);
    wizard.checkedItems.clear();
  };

  const handleShowBioPage = () => {
    props.wizardShowBioPage(wizard.selectedInjury);
  };

  const handleSubmitDiagnosis = () => {
    const checkedSymptoms = [];
    wizard.checkedItems.forEach((value, key) => {
      if (value) {
        checkedSymptoms.push(key);
      }
    });

    const {
      selectedInjury,
      guestBio: { firstName },
    } = wizard;
    const params = {
      d_injury: selectedInjury,
      d_symptoms: checkedSymptoms[0],
      d_name: firstName,
    };
    props.wizardFetchDiagnosis(JSON.stringify(params));
  };

  const handleRestartDiagnosis = () => {
    window.location.reload();
  };

  const handleSelectInjury = ({ target: input }) => {
    if (input.value === '0') {
      wizard.passedInjuryValidation = false;
    } else {
      wizard.selectedInjury = input.value;
      wizard.passedInjuryValidation = true;
    }
    setWizard({ ...wizard });
  };

  const handleChange = ({ target: input }) => {
    wizard.guestBio[input.name] = input.value || 'Guest';
    setWizard({ ...wizard });
  };

  const handleChooseSymptoms = ({ target: input }) => {
    wizard.checkedItems.set(input.name, input.checked);
    if (input.checked && wizard.checkedItems.size !== 0) {
      wizard.passedSymptomsValidation = true;
    } else {
      wizard.passedSymptomsValidation = false;
    }
    setWizard({ ...wizard });
  };

  const handleShowPrevious = previous => {
    props.wizardPreviousStep(previous);
  };

  const handleShowPromptMessage = () => (
    `Are you sure you want to leave this page?
    This action will re-start your free diagnosis`
  );

  const {
    wizard: { isFetching, injuries, symptoms, diagnosis, next },
    history,
  } = props;

  const { firstName } = wizard.guestBio;

  useEffect(() => {
    // listen for when user navigates away
    // reset diagnosis when they accept
    const unlisten = history.listen(location => {
      if (wizard.isBlocking) {
        window.location = location.pathname;
      }
    });

    return function cleanup() {
      unlisten();
    };
  }, [wizard.isBlocking, history]);

  return (
    <>
      {isFetching && <Spinner name="three-bounce" fadeIn="none" />}
      {<Prompt when={wizard.isBlocking} message={handleShowPromptMessage} />}
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
            disabled={!wizard.passedInjuryValidation}
            id="step-2-symptoms"
          />
        </>
      )}
      {next && next.symptoms && (
        <>
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
            disabled={!wizard.passedSymptomsValidation}
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
            id="back-to-step-3-symptoms"
          />
          <Button
            onClick={handleSubmitDiagnosis}
            value="Submit"
            disabled={!wizard.passedInjuryValidation}
            id="step-4-submit"
          />
        </>
      )}
      {next && next.diagnosis && (
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
  history: PropTypes.shape({
    listen: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps, dispatchActions)(Wizard);
