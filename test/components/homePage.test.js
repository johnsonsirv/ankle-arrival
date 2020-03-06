/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import HomePage from '../../src/components/homePage';

describe('<HomePage /> rendering', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HomePage />);
    // expect(wrapper).toMatchSnapshot();
  });
  it('should mount in a full DOM', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('.homepage')).toHaveLength(1);
  });
  it('should render 2 <a> tags for instant diagnosis and talk to a phsyio doctor', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('a')).toHaveLength(2);
    expect(wrapper.find('a').text()).toMatch(/Instant Diagnosis/);
    expect(wrapper.find('a').text()).toMatch(/Talk to a Physio Expert/);
  });
});
