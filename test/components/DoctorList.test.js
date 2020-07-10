/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { BrowserRouter as Router } from 'react-router-dom';
import { DoctorList } from '../../src/containers/doctorList';

function setup() {
  const props = {
    doctors: {
      doctors: [
        {
          id: 1,
          firstname: 'John',
          lastname: 'Mabel',
        },
      ],
      isFetching: false,
    },
    fetchDoctors: jest.fn(),
    currentUser: {
      id: 1,
      username: 'testUser',
      token: 'xxx.yyy.zzz',
    },
  };

  const enzymeWrapper = shallow(<DoctorList {...props} />);

  return { props, enzymeWrapper };
}
describe('<DoctorList /> rendering', () => {
  it('renders correctly', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper).toMatchSnapshot();
  });
  it('should render subcomponent', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Doctor')).toHaveLength(1);
  });

  it('should pass down props to composed component', () => {
    const { props, enzymeWrapper } = setup();
    const { doctors } = props.doctors;
    const subcomponentProps = enzymeWrapper.find('Doctor').first().props();
    expect(subcomponentProps.doctor).toEqual(doctors[0]);
  });

  it('should pass down currentUser props to composed component', () => {
    const { props, enzymeWrapper } = setup();
    const subcomponentProps = enzymeWrapper.find('Doctor').first().props();
    expect(subcomponentProps.currentUser).toEqual(props.currentUser);
  });

  it('should dispatch fetchDoctors in useEffect', () => {
    const { props } = setup();
    mount(
      <Router>
        <DoctorList {...props} />
      </Router>
    );
    const { token } = props.currentUser;
    expect(props.fetchDoctors).toHaveBeenCalledWith(token);
  });
});
