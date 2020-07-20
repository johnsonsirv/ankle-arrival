/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { BookAppointment } from '../../src/containers/bookAppointment';

function setup() {
  const props = {
    doctors: {
      doctors: [
        {
          id: 1,
          firstname: 'John',
          lastname: 'Mabel',
          username: 'jmabel'
        },
      ],
      isFetching: false,
    },
    match: { params: { username: 'jmabel' }},
    currentUser: {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    },
    addNewAppointment: jest.fn(),
    appointments: { isFetching: false, error: { invalid: true } },
  };

  const enzymeWrapper = shallow(<BookAppointment {...props} />);

  return { props, enzymeWrapper };
}

describe('<BookAppointment /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});

describe('<BookAppointment /> interactions', () => {
  const { props, enzymeWrapper } = setup();

  it('should enable <button> if inputs are valid', () => {
    const richTextField = enzymeWrapper.find('RichTextField');
    richTextField.simulate('change', {
      target: { value: 'I need to see a doctor', name: 'description' },
    });
    expect(enzymeWrapper.find('#book-appointment').prop('disabled')).toBe(
      false
    );
  });
  it('should disable <button> for click if inputs are invalid', () => {
    const richTextField = enzymeWrapper.find('RichTextField');
    richTextField.simulate('change', {
      target: { value: null, name: 'description' },
    });
    expect(enzymeWrapper.find('#book-appointment').prop('disabled')).toBe(true);
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
  it('should dispatch addNewAppointment action on handleSubmit', () => {
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
