import React from 'react';
import PropTypes from 'prop-types';
import ComboBox from '../components/forms/inputs/comboBox';

const SymptomsPage = ({ injuries, onChange }) => (
  <ComboBox onChange={onChange}>
    {injuries.map(item => (
      <option key={item.id} value={item.code}>
        {item.name}
      </option>
    ))}
  </ComboBox>
);

SymptomsPage.propTypes = {
  injuries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      code: PropTypes.string,
      description: PropTypes.string,
    }).isRequired
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SymptomsPage;
