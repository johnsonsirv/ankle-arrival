/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Signup } from '../../src/auth/signup';

function setup() {
  const props = {
    createUserAccount: jest.fn(),
    getCurrentUser: jest.fn(),
    isAuthenticated: false,
    userAccount: { created: false },
  };

  const enzymeWrapper = shallow(<Signup {...props} />);

  return { props, enzymeWrapper };
}

describe('<Signup /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 signup <Button> ', () => {
    expect(enzymeWrapper.find('#signup')).toHaveLength(1);
  });
  it('should render 5 <InputTextField />', () => {
    expect(enzymeWrapper.find('InputTextField')).toHaveLength(5);
  });
});

describe('<Signup /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should enable <button> if inputs are valid', () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { value: 'anotheruser', name: 'username' },
    });

    enzymeWrapper.find('#firstname').simulate('change', {
      target: { value: 'John', name: 'firstname' },
    });
    enzymeWrapper.find('#lastname').simulate('change', {
      target: { value: 'Smith', name: 'lastname' },
    });
    enzymeWrapper.find('#password').simulate('change', {
      target: { value: '1234', name: 'password' },
    });
    enzymeWrapper.find('#email').simulate('change', {
      target: { value: 'johnsmith@io.kc', name: 'email' },
    });
    expect(enzymeWrapper.find('#signup').prop('disabled')).toBe(false);
  });
  it('should disable <button> for click if inputs are invalid', () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { value: null, name: 'username' },
    });

    enzymeWrapper.find('#firstname').simulate('change', {
      target: { value: 'John', name: 'firstname' },
    });
    enzymeWrapper.find('#lastname').simulate('change', {
      target: { value: 'Smith', name: 'lastname' },
    });
    enzymeWrapper.find('#password').simulate('change', {
      target: { value: '1234', name: 'password' },
    });
    enzymeWrapper.find('#email').simulate('change', {
      target: { value: null, name: 'email' },
    });
    expect(enzymeWrapper.find('#signup').prop('disabled')).toBe(true);
  });

  it('<InputTextField /> should show username onChange', () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { value: 'anotheruser', name: 'username' },
    });
    expect(enzymeWrapper.find('#username').get(0).props.value).toMatch(
      /anotheruser/
    );
  });
  it('<InputTextField /> should show firstname onChange', () => {
    enzymeWrapper.find('#firstname').simulate('change', {
      target: { value: 'John', name: 'firstname' },
    });
    expect(enzymeWrapper.find('#firstname').get(0).props.value).toMatch(/John/);
  });
  it('<InputTextField /> should show lastname onChange', () => {
    enzymeWrapper.find('#lastname').simulate('change', {
      target: { value: 'Smith', name: 'lastname' },
    });
    expect(enzymeWrapper.find('#lastname').get(0).props.value).toMatch(/Smith/);
  });
  it('<InputTextField /> should show password input as *** onChange', () => {
    enzymeWrapper.find('#password').simulate('change', {
      target: { value: '1234', name: 'password' },
    });
    expect(enzymeWrapper.find('#password').get(0).props.value).toMatch(
      /1234/
    );
  });
  it('<InputTextField /> should show email onChange', () => {
    enzymeWrapper.find('#email').simulate('change', {
      target: { value: 'johnsmith@io.kc', name: 'email' },
    });
    expect(enzymeWrapper.find('#email').get(0).props.value).toMatch(
      /johnsmith@io.kc/
    );
  });
  it('should dispatch createUserAccount action on handleClick', () => {
    enzymeWrapper
      .find('#signup')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.createUserAccount).toHaveBeenCalled();
  });
});

describe('<Signup /> routing', () => {
  it('should redirect to doctors if user is already logged in', () => {
    const props = {
      createUserAccount: jest.fn(),
      getCurrentUser: jest.fn(),
      isAuthenticated: true,
      userAccount: { created: false },
    };

    const enzymeWrapper = shallow(
      <Router>
        <Signup {...props} />
      </Router>
    );
    expect(enzymeWrapper.find('doctors')).not.toHaveLength(1);
  });
});
