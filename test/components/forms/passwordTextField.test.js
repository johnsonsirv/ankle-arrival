/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import PasswordTextField from '../../../src/components/forms/inputs/passwordTextField.';

function setup() {
  const props = {
    name: 'password',
    onChange: jest.fn(),
  };
  const enzymeWrapper = mount(<PasswordTextField {...props} />);

  return { props, enzymeWrapper };
}

describe('<PasswordTextField /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 editable <input> text', () => {
    expect(enzymeWrapper.find('input[type="password"]')).toHaveLength(1);
  });
});

describe('<PasswordTextField /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should handle onChange', () => {
    enzymeWrapper.simulate('change', { target: { value: 'Password' } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
