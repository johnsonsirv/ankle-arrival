/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import TimeInput from '../../../src/components/forms/inputs/timeInput';

function setup(customProps = {}) {
  const props = {
    ...customProps,
    name: '',
    onChange: jest.fn(),
  };

  const enzymeWrapper = shallow(<TimeInput {...props} />);
  return { props, enzymeWrapper };
}
describe('<TimeInput /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render input correctly with empty value', () => {
    const customProps = {
      value: null,
    };
    const { enzymeWrapper } = setup(customProps);
    expect(enzymeWrapper.prop('selected')).toEqual(null);
  });
  it('should render showTimeSelect the first available time', () => {
    expect(enzymeWrapper.prop('showTimeSelect')).toBe(true);
  });
  it('should render timeSelectOnly', () => {
    expect(enzymeWrapper.prop('showTimeSelectOnly')).toBe(true);
  });
});

describe('<TimeInput /> interactions', () => {
  it('should return selected date onChange', () => {
    const customProps = {
      value: new Date(),
    };
    const newTime = '1:00 PM';
    const { props, enzymeWrapper } = setup(customProps);
    enzymeWrapper.simulate('change', new Date());
    expect(props.onChange).toHaveBeenCalled();
  });
});
