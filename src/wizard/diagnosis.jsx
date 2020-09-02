import React from 'react';
import PropTypes from 'prop-types';

const DiagnosisPage = ({
  diagnosis: {
    injury,
    disease,
    symptoms,
    player,
    treatment,
    lifestyle,
  },
}) => (
  <div>
    <h2>{`Hi, ${player}. Your result is ready!`}</h2>
    <div>
      <p>
        <h3>Injured Area</h3>
        {injury}
      </p>
    </div>
    <div>
      <p>
        <h3>You experience these symptoms</h3>
        {symptoms}
      </p>
    </div>
    <div>
      <p>
        <h3>Possible Injury / Disease</h3>
        {disease}
      </p>
    </div>
    <div>
      <p>
        <h3>Treatment / Lifestyle</h3>
        {treatment}
      </p>
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
