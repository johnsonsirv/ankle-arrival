/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import PageNotFound from '../../src/components/notFoundPage';

function setup() {
  const enzymeWrapper = shallow(<PageNotFound />);

  return { enzymeWrapper };
}

describe('<PageNotFound /> rendering', () => {
  const { enzymeWrapper } = setup();

  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });
});
