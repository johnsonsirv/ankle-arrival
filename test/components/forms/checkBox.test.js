/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import CheckBox from '../../../src/components/forms/inputs/checkBox';

function setup() {
  const props = {
    name: 'checkbox',
    onClick: jest.fn(),
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
      <CheckBox {...props} value={options[1].value} label={options[1].label} />
    </>
  );
  return { props, enzymeWrapper };
}

describe('<CheckBox /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render clickable checkbox', () => {
    expect(enzymeWrapper.find('input[type="checkbox"]')).toHaveLength(2);
  });
  it('should render checkbox 1 label next to control', () => {
    expect(
      enzymeWrapper
        .find('label')
        .at(0)
        .text()
    ).toEqual('Sample Option 1');
  });
  it('should render checkbox 2 label next to control', () => {
    expect(
      enzymeWrapper
        .find('label')
        .at(1)
        .text()
    ).toEqual('Sample Option 2');
  });
});

describe('<CheckBox /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should check selected box onClick', () => {
    enzymeWrapper
      .find('input')
      .first()
      .simulate('click', { target: { value: '' } });
    expect(props.onClick).toHaveBeenCalled();
  });
});
