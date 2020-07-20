import { ProtectedRoute } from '../../src/containers/protectedRoute';
import { DoctorList } from '../../src/containers/doctorList';

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

function setup() {
  const props = {
    render: jest.fn(),
    component: DoctorList,
    isAuthenticated: false,
    getCurrentUser: jest.fn(),
  };
  const enzymeWrapper = shallow(<ProtectedRoute {...props} />)
  return { enzymeWrapper, props }
}

describe('<ProtectedRoute /> rendering', () => {
  const { enzymeWrapper } = setup();
  it('should render correctly', () => {
    expect(enzymeWrapper).toMatchSnapshot();
  });

});
