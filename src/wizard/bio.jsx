import React from 'react';
import PropTypes from 'prop-types';
import InputTextField from '../components/forms/inputs/inputTextField';

const BioPage = ({ guestName, onInputChange }) => (
  <div>
    <form>
      <InputTextField
        id="firstname"
        name="firstName"
        onChange={onInputChange}
        value={guestName}
      />
    </form>
  </div>
);

BioPage.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  guestName: PropTypes.string.isRequired,
};

export default BioPage;
