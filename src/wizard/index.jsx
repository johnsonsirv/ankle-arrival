import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import * as dispatchActions from '../actions';
import WizardSteps from './wizardSteps';
import InjuryPage from './injury';
import Button from '../components/forms/inputs/button';

const mapStateToProps = state => state;

export const Wizard = props => {
  const [wizard, setWizard] = useState({
    showUserBioPage: false,
    init: true,
    selectedInjury: null,
  });

  const handleStartDiagnosis = () => {
    props.fetchInjuries();
  };

  const handleShowSymptoms = () => {};

  const handleShowBioPage = () => {};

  const handleSubmitDiagnosis = () => {};

  const handleChange = () => {};

  const { isFetching, injuries, symptoms } = props;
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
            id="start-diagnosis"
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
          <InjuryPage symptoms={symptoms} onChange={handleChange} />
          <Button
            onClick={handleShowSymptoms}
            value="Next"
            disabled={!injuries}
            id="step-2-symptoms"
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
};

export default connect(mapStateToProps, dispatchActions)(Wizard);
