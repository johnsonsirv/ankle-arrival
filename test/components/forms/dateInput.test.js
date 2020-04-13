/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import DateInput from '../../../src/components/forms/inputs/dateInput';

function setup(customProps = {}) {
  const props = {
    availableDates: ['date-range'],
    onChange: jest.fn(),
    name: 'date',
  };

  const enzymeWrapper = shallow(<DateInput {...customProps} {...props} />);
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
    const { props } = setup(customProps);
    const enzymeWrapper = mount(<DateInput {...customProps} {...props} />);
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
    const { props } = setup(customProps);
    const enzymeWrapper = shallow(<DateInput {...customProps} {...props} />);
    enzymeWrapper.simulate('change', { target: { value: newDate } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
