/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import moment from 'moment';
import { BookAppointment } from '../../src/containers/bookAppointment';

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
      firstname: 'Victor',
      lastname: 'Johnson',
    },
    addNewAppointment: jest.fn(),
  };

  const enzymeWrapper = shallow(<BookAppointment {...props} />);

  return { props, enzymeWrapper };
}

describe('<BookAppointment /> rendering', () => {
  const { props, enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should receive doctor props', () => {
    const doctor = `${props.doctor.firstname} ${props.doctor.lastname}`;
    expect(enzymeWrapper.find('ReadOnlyTextField').get(0).props.value).toEqual(
      doctor
    );
  });
  it('should receive currentUser props', () => {
    const currentUser = `${props.currentUser.firstname} ${props.currentUser.lastname}`;
    expect(enzymeWrapper.find('ReadOnlyTextField').get(1).props.value).toEqual(
      currentUser
    );
  });
  it('should render 1 <Button>', () => {
    expect(enzymeWrapper.find('button')).toHaveLength(1);
  });
  it('should render 2 <ReadOnlyTextField />', () => {
    expect(enzymeWrapper.find('ReadOnlyTextField')).toHaveLength(2);
  });
  it('should render a <DateInput /> component', () => {
    expect(enzymeWrapper.find('DateInput')).toHaveLength(1);
  });
  it('should render a <TimeInput /> component', () => {
    expect(enzymeWrapper.find('TimeInput')).toHaveLength(1);
  });
  it('should render a <RichTextField /> component', () => {
    expect(enzymeWrapper.find('RichTextField')).toHaveLength(1);
  });
});

describe('<BookAppointment /> interactions', () => {
  const { props, enzymeWrapper } = setup();

  it('should enable <button> if inputs are valid', () => {
    const dateInput = enzymeWrapper.find('DateInput');
    dateInput.simulate('change', {
      target: {
        value: moment().format('2020-03-06'),
        name: 'dateOfAppointment',
      },
    });
    const timeInput = enzymeWrapper.find('TimeInput');
    timeInput.simulate('change', {
      target: { value: '12:00 PM', name: 'timeOfAppointment' },
    });
    const richTextField = enzymeWrapper.find('RichTextField');
    richTextField.simulate('change', {
      target: { value: 'I need to see a doctor', name: 'description' },
    });
    expect(enzymeWrapper.find('#book-appointment').prop('disabled')).toBe(
      false
    );
  });
  it('should disable <button> for click if inputs are invalid', () => {
    const dateInput = enzymeWrapper.find('DateInput');
    dateInput.simulate('change', {
      target: { value: null, name: 'dateOfAppointment' },
    });
    expect(enzymeWrapper.find('#book-appointment').prop('disabled')).toBe(true);
  });
  it('<DateInput /> should show selected date onChange', () => {
    const dateInput = enzymeWrapper.find('DateInput');
    dateInput.simulate('change', {
      target: {
        value: moment().format('2020-03-06'),
        name: 'dateOfAppointment',
      },
    });
    expect(enzymeWrapper.find('DateInput').prop('value')).toEqual('2020-03-06');
  });
  it('<TimeInput /> should show selected time onChange', () => {
    const timeInput = enzymeWrapper.find('TimeInput');
    timeInput.simulate('change', {
      target: { value: '12:00 PM', name: 'timeOfAppointment' },
    });
    expect(enzymeWrapper.find('TimeInput').prop('value')).toEqual('12:00 PM');
  });
  it('<RichTextField /> should show description onChange', () => {
    const richTextField = enzymeWrapper.find('RichTextField');
    richTextField.simulate('change', {
      target: { value: 'I need to see a doctor', name: 'description' },
    });
    expect(enzymeWrapper.find('RichTextField').get(0).props.value).toMatch(
      /I need to see a doctor/
    );
  });
  it('should dispatch saveAppointment action on handleSubmit', () => {
    const dateInput = enzymeWrapper.find('DateInput');
    dateInput.simulate('change', {
      target: {
        value: moment().format('2020-03-06'),
        name: 'dateOfAppointment',
      },
    });
    const timeInput = enzymeWrapper.find('TimeInput');
    timeInput.simulate('change', {
      target: { value: '12:00 PM', name: 'timeOfAppointment' },
    });
    const richTextField = enzymeWrapper.find('RichTextField');
    richTextField.simulate('change', {
      target: { value: 'I need to see a doctor', name: 'description' },
    });

    enzymeWrapper
      .find('#book-appointment')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.addNewAppointment).toHaveBeenCalled();
  });
});
