/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import App from '../src/components/App';

describe('<App /> rendering', () => {
  it('renders correctly', () => {
    let wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should mount in a full DOM', () => {
    expect(shallow(<App />).find('.App')).toHaveLength(1);
  });
  it('renders learn react link', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find('a').text()).toMatch(/Learn React/);
  });
  it('renders react header selectable by class "App-header"', () => {
    let wrapper = shallow(<App />);
    expect(wrapper.find('header').is('.App-header')).toBe(true);
  });
});
