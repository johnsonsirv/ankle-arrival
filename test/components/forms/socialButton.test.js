/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import SocialButton from '../../../src/components/forms/inputs/socialButton';
import { google } from '../../../src/config/socialLogin';

function setup() {
  const props = {
    value: 'Login with Google',
    provider: google.providerName,
    appId: google.appId,
    triggerLogin: jest.fn(),
  };
  const enzymeWrapper = mount(<SocialButton {...props} />);

  return { props, enzymeWrapper };
}

describe('<SocialButton /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 <button>', () => {
    expect(enzymeWrapper.find('button')).toHaveLength(1);
  });
  it('should set a text value for button', () => {
    expect(enzymeWrapper.find('button').text()).toMatch(/Login with Google/);
  });
  it('should render <button> as enabled', () => {
    expect(enzymeWrapper.find('button').prop('disabled')).toBeUndefined();
  });
});

describe('<SocialButton /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should handle onClick', () => {
    enzymeWrapper.simulate('click', { target: {}, preventDefault: jest.fn() });
    expect(props.triggerLogin).toHaveBeenCalled();
  });
});
