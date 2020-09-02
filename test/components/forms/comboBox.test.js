/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import ComboBox from '../../../src/components/forms/inputs/comboBox';

function setup() {
  const props = {
    name: 'combo',
    onChange: jest.fn(),
  };
  const options = [
    {
      id: 1,
      value: 'Sample Option 1',
    },
    {
      id: 2,
      value: 'Sample Option 2',
    },
  ];
  const enzymeWrapper = mount(
    <ComboBox {...props}>
      {options.map(item => (
        <option key={item.id} value={item.value}>
          {item.value}
        </option>
      ))}
    </ComboBox>
  );

  return { props, enzymeWrapper };
}

describe('<ComboBox /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 editable <input> select', () => {
    expect(enzymeWrapper.find('select')).toHaveLength(1);
  });
  it('should render 2 <option> elements', () => {
    expect(enzymeWrapper.find('option')).toHaveLength(2);
  });
});

describe('<ComboBox /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should handle onChange', () => {
    enzymeWrapper.simulate('change', {
      target: { value: 'Sample Option 2' },
    });
    expect(props.onChange).toHaveBeenCalled();
  });
});
