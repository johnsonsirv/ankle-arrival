import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../components/forms/inputs/checkBox';

const SymptomsPage = ({ symptoms, onChange }) => (
  <>
    {symptoms.map(item => (
      <CheckBox
        key={item.id}
        id={item.code}
        name={item.code}
        value={item.code}
        onChange={onChange}
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
  onChange: PropTypes.func.isRequired,
};

export default SymptomsPage;
