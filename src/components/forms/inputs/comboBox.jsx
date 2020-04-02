import React from 'react';
import PropTypes from 'prop-types';

const ComboBox = ({ className, id, name, onChange, children }) => (
  <select className={className} name={name} id={id} onChange={onChange}>
    {children}
  </select>
);

ComboBox.defaultProps = {
  name: '',
  id: '',
  className: '',
};

ComboBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ComboBox;
