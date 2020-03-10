/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import ReadOnlyTextField from '../../../src/components/forms/inputs/readOnlyTextField';

describe('<ReadOnlyTextField /> rendering', () => {
  const enzymeWrapper = mount(<ReadOnlyTextField />);
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render 1 <input> text as readonly', () => {
    expect(enzymeWrapper.find('input').prop('readOnly')).toBe(true);
  });
});
