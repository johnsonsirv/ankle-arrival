/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import TimeInput from '../../../src/components/forms/inputs/timeInput';

function setup(customProps = {}) {
  const props = {
    ...customProps,
    name: '',
    availablTime: ['time-range'],
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
  it('should include only available time ranges', () => {
    expect(enzymeWrapper.prop('value')).toEqual(['time-range']);
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
      value: '12:00 PM',
    };
    const newTime = '1:00 PM';
    const { props, enzymeWrapper } = setup(customProps);
    enzymeWrapper.simulate('change', { target: { value: newTime } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
