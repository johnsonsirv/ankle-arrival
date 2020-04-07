import React from 'react';
import PropTypes from 'prop-types';
import NumberTextField from '../components/forms/inputs/numberTextField';
import InputTextField from '../components/forms/inputs/inputTextField';
import ComboBox from '../components/forms/inputs/comboBox';

const GENDER = [
  { id: 1, value: '', text: '' },
  { id: 2, value: 'female', text: 'Female' },
  { id: 3, value: 'male', text: 'Male' },
];

const BioPage = ({ userBio, onInputChange }) => (
  <div>
    <form>
      <InputTextField
        id="fullname"
        name="fullname"
        onChange={onInputChange}
        value={userBio.fullname}
      />
      <NumberTextField
        id="age"
        name="age"
        onChange={onInputChange}
        value={userBio.age}
      />
      <InputTextField
        id="height"
        name="height"
        onChange={onInputChange}
        value={userBio.height}
      />
      <ComboBox onChange={onInputChange}>
        {GENDER.map(item => (
          <option key={item.id} value={item.value}>
            {item.text}
          </option>
        ))}
      </ComboBox>
    </form>
  </div>
);

BioPage.propTypes = {
  userBio: PropTypes.shape({
    fullname: PropTypes.string,
    age: PropTypes.string,
    height: PropTypes.string,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default BioPage;
