/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import Button from '../../../src/components/forms/inputs/button';

function setup() {
  const props = {
    value: 'Send',
    onClick: jest.fn(),
  };
  const enzymeWrapper = mount(<Button {...props} />);

  return { props, enzymeWrapper };
}

describe('<Button /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 editable <button>', () => {
    expect(enzymeWrapper.find('button')).toHaveLength(1);
  });
  it('should set a text value for button', () => {
    expect(enzymeWrapper.find('button').text()).toMatch(/Send/);
  });
  it('should render <button> enabled', () => {
    expect(enzymeWrapper.find('button').prop('disabled')).toBe(false);
  });
});

describe('<Button /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should handle onClick', () => {
    enzymeWrapper.simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.onClick).toHaveBeenCalled();
  });
});
