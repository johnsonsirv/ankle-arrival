import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../components/forms/inputs/checkBox';

const SymptomsPage = ({ symptoms, onClick }) => (
  <>
    {symptoms.map(item => (
      <CheckBox
        key={item.id}
        value={item.code}
        onClick={onClick}
        label={item.description}
      />
    ))}
  </>
);

SymptomsPage.propTypes = {
  symptoms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      description: PropTypes.string,
    }).isRequired
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SymptomsPage;
