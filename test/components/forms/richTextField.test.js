/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import RichTextField from '../../../src/components/forms/inputs/richTextField';

function setup() {
  const props = {
    name: 'description',
    onChange: jest.fn(),
  };
  const enzymeWrapper = mount(<RichTextField {...props} />);

  return { props, enzymeWrapper };
}

describe('<RichTextField /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('renders correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render a <textarea>', () => {
    expect(enzymeWrapper.find('textarea')).toHaveLength(1);
  });
});

describe('<RichTextField /> interactions', () => {
  const { props, enzymeWrapper } = setup();
  it('should handle onChange', () => {
    const rchText = enzymeWrapper.find('textarea');
    rchText.simulate('change', { target: { value: 'Sample Text' } });
    expect(props.onChange).toHaveBeenCalled();
  });
});
