/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { BrowserRouter as Router } from 'react-router-dom';
import { Login } from '../../src/auth/login';

function setup() {
  const props = {
    authenticateUser: jest.fn(),
    getCurrentUser: jest.fn(),
    isAuthenticated: false,
    userLogin: { ok: false },
  };

  const enzymeWrapper = shallow(<Login {...props} />);

  return { props, enzymeWrapper };
}

describe('<Login /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 signup <Button> ', () => {
    expect(enzymeWrapper.find('#login')).toHaveLength(1);
  });
  it('should render 2 <InputTextField /> for username and password', () => {
    expect(enzymeWrapper.find('InputTextField')).toHaveLength(2);
  });
});

describe('<Login /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should enable <button> if inputs are valid', () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { value: 'anotheruser', name: 'username' },
    });

    enzymeWrapper.find('#password').simulate('change', {
      target: { value: '1234', name: 'password' },
    });
    expect(enzymeWrapper.find('#login').prop('disabled')).toBe(false);
  });
  it('should disable <button> for click if inputs are invalid', () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { value: null, name: 'username' },
    });

    enzymeWrapper.find('#password').simulate('change', {
      target: { value: null, name: 'password' },
    });
    expect(enzymeWrapper.find('#login').prop('disabled')).toBe(true);
  });

  it('<InputTextField /> should show username onChange', () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { value: 'anotheruser', name: 'username' },
    });
    expect(enzymeWrapper.find('#username').get(0).props.value).toMatch(
      /anotheruser/
    );
  });
  it('<InputTextField /> should show password input as *** onChange', () => {
    enzymeWrapper.find('#password').simulate('change', {
      target: { value: '1234', name: 'password' },
    });
    expect(enzymeWrapper.find('#password').get(0).props.value).toMatch(
      /1234/
    );
  });
  it('should dispatch authenticateUser action on handleLogin', () => {
    enzymeWrapper.find('#username').simulate('change', {
      target: { value: 'anotheruser', name: 'username' },
    });
    enzymeWrapper.find('#password').simulate('change', {
      target: { value: '1234', name: 'password' },
    });
    enzymeWrapper
      .find('#login')
      .simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.authenticateUser).toHaveBeenCalled();
  });
});

describe('<Login /> routing', () => {
  it('should redirect to doctors if user is already logged in', () => {
    const props = {
      authenticateUser: jest.fn(),
      getCurrentUser: jest.fn(),
      isAuthenticated: true,
      userLogin: { ok: false },
    };
    const enzymeWrapper = shallow(
      <Router>
        <Login {...props} />
      </Router>
    );
    expect(enzymeWrapper.find('doctors')).not.toHaveLength(1);
  });
});
