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
    <div>
      <p>{injury}</p>
    </div>
    <div>
      <p>{symptoms}</p>
    </div>
    <header>Possible diseases based on infered analysis</header>
    <div>
      <p>{disease}</p>
    </div>
    <header>Treatment / Lifestyle</header>
    <div>
      <p>{treatment}</p>
    </div>
    <div>
      <p>{lifestyle}</p>
    </div>
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
