/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import InpuTextField from '../../../src/components/forms/inputs/inputTextField';

function setup() {
  const props = {
    name: 'description',
    onChange: jest.fn(),
  };
  const enzymeWrapper = mount(<InpuTextField {...props} />);

  return { props, enzymeWrapper };
}

describe('<InpuTextField /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 editable <input> text', () => {
    expect(enzymeWrapper.find('input').prop('readOnly')).toBeUndefined();
  });
});

describe('<InputTextFieldd /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should handle onChange', () => {
    enzymeWrapper.simulate('change', { target: { value: 'Sample Text' } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
