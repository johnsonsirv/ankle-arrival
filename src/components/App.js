import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './homePage';
// import DoctorDetails from '../containers/doctorDetails';
import AppointmentList from '../containers/appointmentList';
import DoctorList from '../containers/doctorList';
import Wizard from '../wizard';
import Signup from '../auth/signup';
import Login from '../auth/login';
import ProtectedRoute from '../containers/protectedRoute';
import PageNotFound from './notFoundPage';
import NavBar from './navBar';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <NavBar />
        <Switch>
          {/* <ProtectedRoute
            path="/doctors/:id/:username"
            component={DoctorDetails}
          /> */}
          <ProtectedRoute path="/appointments" component={AppointmentList} />
          <ProtectedRoute path="/doctors" component={DoctorList} />
          <Route path="/diagnosis" component={Wizard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={HomePage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
}

export default App;
