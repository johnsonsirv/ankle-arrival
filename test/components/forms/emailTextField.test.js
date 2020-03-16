/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import EmailTextField from '../../../src/components/forms/inputs/emailTextField';

function setup() {
  const props = {
    name: 'email',
    onChange: jest.fn(),
  };
  const enzymeWrapper = mount(<EmailTextField {...props} />);

  return { props, enzymeWrapper };
}

describe('<EmailTextField /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 editable <input> email', () => {
    expect(enzymeWrapper.find('input[type="email"]')).toHaveLength(1);
  });
});

describe('<EmailTextField /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should handle onChange', () => {
    enzymeWrapper.simulate('change', {
      target: { value: 'example@example.com' },
    });
    expect(props.onChange).toHaveBeenCalled();
  });
});
