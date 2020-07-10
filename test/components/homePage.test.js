/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import HomePage from '../../src/components/homePage';

describe('<HomePage /> rendering', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper).toMatchSnapshot();
  });
});
