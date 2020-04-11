/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { MemoryRouter } from 'react-router';
import App from '../../src/components/App';
import HomePage from '../../src/components/homePage';
import { AppointmentList } from '../../src/containers/appointmentList';
import { DoctorList } from '../../src/containers/doctorList';
import { Wizard } from '../../src/wizard';

describe('<App /> rendering', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should mount in a full DOM', () => {
    expect(shallow(<App />).find('.App')).toHaveLength(1);
  });
  it('should render a toast notification container', () => {
    expect(shallow(<App />).find('ToastContainer')).toHaveLength(1);
  });
});

describe('<App /> routing', () => {
  it('should show homepage component for "/" router', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(HomePage)).toHaveLength(1);
  });
  it('should show doctorlist component for "/doctors" router', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/doctors']}>
        <DoctorList />
      </MemoryRouter>
    );

    expect(wrapper.find(DoctorList)).toHaveLength(1);
  });
  it('should show appointmentlist component for "/appointments" router', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/appointments']}>
        <AppointmentList />
      </MemoryRouter>
    );

    expect(wrapper.find(AppointmentList)).toHaveLength(1);
  });
  it('should show wizard component for "/wizard" router', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/wizard']}>
        <Wizard />
      </MemoryRouter>
    );

    expect(wrapper.find(Wizard)).toHaveLength(1);
  });
  it('should show homepage component as default for unknown route', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/unknown']}>
        <HomePage />
      </MemoryRouter>
    );

    expect(wrapper.find(HomePage)).toHaveLength(1);
  });
});
