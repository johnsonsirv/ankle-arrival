import ProtectedRoute from '../../src/containers/protectedRoute';
import { DoctorList } from '../../src/containers/doctorList';

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */

function setup(customProps) {
  const props = {
    render: jest.fn(),
    component: DoctorList,
    isAuthenticated: false,
    getCurrentUser: jest.fn()
  };
  const enzymewrapper = shallow(<ProtectedRoute {...customProps} {...props} />)
  return { enzymewrapper, props }
}

describe('<ProtectedRoute /> rendering', () => {
  it('should render correctly', () => {
    
  });

});

describe('<ProtectedRoute /> routing', () => {
  it('should routes authenticated users to <Component />', () => {
    
  });
  it('should routes unauthenticated users to  <Login>', () => {
    
  });
});

describe('<ProtectedRoute /> interactions', () => {
  it('should dispatch getCurrentUser action in useEffect', () => {
    
  });
});