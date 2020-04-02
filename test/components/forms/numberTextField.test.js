/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import NumberTextField from '../../../src/components/forms/inputs/numberTextField';

function setup() {
  const props = {
    name: 'number',
    onChange: jest.fn(),
  };
  const enzymeWrapper = mount(<NumberTextField {...props} />);

  return { props, enzymeWrapper };
}

describe('<NumberTextField /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 editable <input> number', () => {
    expect(enzymeWrapper.find('input[type="number"]')).toHaveLength(1);
  });
});

describe('<NumberTextField /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should handle onChange', () => {
    enzymeWrapper.simulate('change', {
      target: { value: 123 },
    });
    expect(props.onChange).toHaveBeenCalled();
  });
});
