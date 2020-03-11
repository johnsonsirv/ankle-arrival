/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import DateInput from '../../../src/components/forms/inputs/dateInput';

function setup(customProps = {}) {
  const defaultProps = {};
  const props = {
    ...customProps,
    availableDates: ['date-range'],
    onChange: jest.fn(),
  };

  const enzymeWrapper = mount(<DateInput {...defaultProps} {...props} />);
  return { props, enzymeWrapper };
}
describe('<DateInput /> rendering', () => {
  it('should render correctly', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should include only available days of each week', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.prop('value')).toEqual(['date-range']);
  });
  it('should render input correctly with empty value', () => {
    const customProps = {
      value: null,
    };
    const { enzymeWrapper } = setup(customProps);
    expect(enzymeWrapper.prop('value')).toEqual(null);
  });
  it('should openTo the first available date', () => {
    expect(2).toEqual(1);
  });
  it('should render inline', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.prop('inline')).toBe(true);
  });
});

describe('<DateInput /> interactions', () => {
  it('should return selected date onChange', () => {
    const customProps = {
      value: new Date('03/08/2020'),
    };
    const newDate = new Date('03/09/2020');
    const { props, enzymeWrapper } = setup(customProps);
    enzymeWrapper.simulate('change', { target: { value: newDate } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
