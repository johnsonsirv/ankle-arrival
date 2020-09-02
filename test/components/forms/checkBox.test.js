/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import CheckBox from '../../../src/components/forms/inputs/checkBox';

function setup() {
  const props = {
    id: '1',
    name: 'checkbox',
    onChange: jest.fn(),
  };

  const options = [
    {
      value: '1',
      label: 'Sample Option 1',
    },
    {
      value: '2',
      label: 'Sample Option 2',
    },
  ];

  const enzymeWrapper = mount(
    <>
      <CheckBox {...props} value={options[0].value} label={options[0].label} />
    </>
  );
  return { props, enzymeWrapper };
}

describe('<CheckBox /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});

describe('<CheckBox /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should check selected box onClick', () => {
    enzymeWrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: '1' } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
