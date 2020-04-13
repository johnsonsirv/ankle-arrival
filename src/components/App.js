import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from './homePage';
import DoctorDetails from '../containers/doctorDetails';
import AppointmentList from '../containers/appointmentList';
import DoctorList from '../containers/doctorList';
import Wizard from '../wizard';
import Signup from '../auth/signup';
import Login from '../auth/login';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/doctors/:id/:username"
            component={DoctorDetails}
          />
          <Route exact path="/appointments" component={AppointmentList} />
          <Route exact path="/doctors" component={DoctorList} />
          <Route exact path="/wizard" component={Wizard} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={HomePage} />
          <Route component={HomePage} />
        </Switch>
      </div>
    </>
  );
}

export default App;
