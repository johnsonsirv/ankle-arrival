/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import RichTextField from '../../../src/components/forms/inputs/richTextField';

describe('<RichTextField /> rendering', () => {
  const enzymeWrapper = mount(<RichTextField name="description" />);
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 <input> text as readonly', () => {
    expect(enzymeWrapper.find('textarea')).toHaveLength(1);
  });
});
