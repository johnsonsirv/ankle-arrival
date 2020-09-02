import Joi from 'joi-browser';

export const validateProperty = data => {
  const { name, value } = data.target;
  const obj = { [name]: value };
  const subSchema = { [name]: data.schema[name] };
  const { error } = Joi.validate(obj, subSchema);
  return error ? error.details[0] : null;
};

export const validateAllProperty = obj => {
  const { data, schema } = obj;
  const { error } = Joi.validate(data, schema);

  return !error;
};

export const inputTextErrorStyle = {
  outlineWidth: '2px',
  outlineColor: 'red',
  outlineStyle: 'solid',
};
