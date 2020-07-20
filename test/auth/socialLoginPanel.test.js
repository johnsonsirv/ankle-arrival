/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { SocialLoginPanel } from '../../src/auth/socialLoginPanel';
import { google } from '../../src/config/socialLogin';

function setup() {
  const props = {
    authenticateUser: jest.fn(),
  };

  const enzymeWrapper = shallow(<SocialLoginPanel {...props} />);

  return { props, enzymeWrapper };
}

describe('<SocialLoginPanel /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render link to login with Google', () => {
    expect(enzymeWrapper.find('#google-login')).toHaveLength(1);
  });
  it('should render google <button> with appId prop', () => {
    expect(enzymeWrapper.find('#google-login').prop('appId')).toEqual(
      google.appId
    );
  });
  it('should render google <button> with provider prop', () => {
    expect(enzymeWrapper.find('#google-login').prop('provider')).toEqual(
      google.providerName
    );
  });
});

// describe('<SocialLoginPanel /> interactions', () => {
//   const { props, enzymeWrapper } = setup();
//   it('<GoogleLogin> should dispatch action on onCLick', () => {
//     enzymeWrapper
//       .find('#google-login')
//       .simulate('click', { target: {}, preventDefault: jest.fn() });
//     expect(props.authenticateUser).toHaveBeenCalled();
//   });
// });

// describe('<SocialLoginPanel /> state management', () => {
//   const { enzymeWrapper } = setup();
//   it('<GoogleLogin> should update state user email, firstname, lastname onLoginSuccess', () => {
//     const onLoginSuccess = jest.fn();
//     const mockResponse = {
//       user: {
//         email: 'tabby@gmail.com',
//         firstname: 'Tabby',
//         lastname: 'John',
//       },
//     };
//     onLoginSuccess.mockResolvedValue(mockResponse);

//     enzymeWrapper
//       .find('#google-login')
//       .simulate('click', { target: {}, preventDefault: jest.fn() });
//     expect(enzymeWrapper.state.user).toEqual(mockResponse);
//   });
// });
