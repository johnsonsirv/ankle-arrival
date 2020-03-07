/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { BookAppointment } from '../../src/containers/bookAppointment';

const moment = require
  .requireActual('moment-timezone')
  .tz.setDefault('America/Los_Angeles');
function setup() {
  const props = {
    doctor: {
      id: 1,
      firstname: 'Larry',
      lastname: 'Page',
      email: 'example@larry.com',
      city: 'NY',
      username: 'larryp123',
    },
    currentUser: {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    },
    handleDateInputChange: jest.fn(),
    handleTimeInputChange: jest.fn(),
    handleSubmit: jest.fn(),
    saveAppointment: jest.fn(),
  };

  const enzymeWrapper = shallow(<BookAppointment {...props} />);

  return { props, enzymeWrapper };
}

describe('<BookAppointment /> rendering', () => {
  const { props, enzymeWrapper } = setup();

  it('should render correctly', () => {});
  it('should receive doctor props', () => {});
  it('should receive currentUser props', () => {});
  it('should render 1 <Button>', () => {
    expect(enzymeWrapper.find('button')).toHaveLength(1);
  });
  it('should render 2 readOnly <input> element', () => {
    expect(enzymeWrapper.find('[type="text"]').prop('readOnly')).toHaveLength(
      2
    );
  });
  it('should render a <DateInput /> component', () => {
    expect(enzymeWrapper.find('DateInput')).toHaveLength(1);
  });
  it('should render a <TimeInput /> component', () => {
    expect(enzymeWrapper.find('TimeInput')).toHaveLength(1);
  });
});

describe('<BookAppointment /> interactions', () => {
  const { props, enzymeWrapper } = setup();

  it('should enable <button> if inputs are valid', () => {
    const dateInput = enzymeWrapper.find('DateInput');
    dateInput.simulate('change', { target: { value: moment('2020-03-06') } });
    expect(enzymeWrapper.find('button').prop('disabled')).toBe(false);
  });
  it('should disable <button> for click if inputs are invalid', () => {
    const dateInput = enzymeWrapper.find('DateInput');
    dateInput.simulate('change', { target: { value: moment('1992-03-06') } });
    expect(enzymeWrapper.find('button').prop('disabled')).toBe(true);
  });
  it('should dispatch saveAppointment action on handleSubmit', () => {
    enzymeWrapper.find('button').simulate('click');
    expect(props.saveAppointment).toHaveBeenCalled();
  });
});
