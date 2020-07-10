/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import { MemoryRouter } from 'react-router';
import App from '../../src/components/App';
import HomePage from '../../src/components/homePage';
import PageNotFound from '../../src/components/notFoundPage';

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
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/']}>
        <HomePage />
      </MemoryRouter>
    );

    expect(wrapper.find(HomePage)).toHaveLength(1);
  });
  it('should show pageNotFound component for unknown route', () => {
    const wrapper = shallow(
      <MemoryRouter initialEntries={['/unknown']}>
        <PageNotFound />
      </MemoryRouter>
    );

    expect(wrapper.find(PageNotFound)).toHaveLength(1);
  });
});
