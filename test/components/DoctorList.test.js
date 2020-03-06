/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { DoctorList } from '../../src/containers/doctorList';

function setup() {
  const props = {
    doctors: [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Mabel',
      },
      {
        id: 2,
        firstname: 'Larry',
        lastname: 'Page',
      },
    ],
    isFetching: false,
    fetchDoctors: jest.fn(),
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
    expect(enzymeWrapper.find('Doctor')).toHaveLength(2);
  });
  it('should pass down props to composed component', () => {
    const { props, enzymeWrapper } = setup();
    const subcomponentProps = enzymeWrapper
      .find('Doctor')
      .first()
      .props();
    expect(subcomponentProps.doctor).toEqual(props.doctors[0]);
  });
  it('should dispatch fetchDoctors in useEffect', () => {
    const { props } = setup();
    mount(<DoctorList {...props} />);
    const token = 'xxx.yyy.zzz';
    expect(props.fetchDoctors).toHaveBeenCalledWith(token);
  });
});
