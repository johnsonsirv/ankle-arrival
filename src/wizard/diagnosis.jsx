import React from 'react';
import PropTypes from 'prop-types';

const DiagnosisPage = ({
  diagnosis: {
    injury,
    disease,
    symptoms,
    player,
    inference,
    treatment,
    lifestyle,
  },
}) => (
  <div>
    <header>Results</header>
    <header>Diagnosis &amp; symptoms</header>
    <header>Possible diseases based on infered analysis</header>
    <header>Treatment / Lifestyle</header>
  </div>
);

DiagnosisPage.propTypes = {
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

export default DiagnosisPage;
