import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './homePage';
import AppointmentList from '../containers/appointmentList';
import BookAppointment from '../containers/bookAppointment';
import DoctorList from '../containers/doctorList';
import Wizard from '../wizard';
import Signup from '../auth/signup';
import Login from '../auth/login';
import ProtectedRoute from '../containers/protectedRoute';
import PageNotFound from './notFoundPage';
import NavBar from './navBar';

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Switch>
          <ProtectedRoute
            path="/book-appointment/:username"
            component={BookAppointment}
          />
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
