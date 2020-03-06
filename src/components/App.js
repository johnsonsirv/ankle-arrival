import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './homePage';
import DoctorDetails from '../containers/doctorDetails';
import AppointmentList from '../containers/appointmentList';
import DoctorList from '../containers/doctorList';
import Diagnosis from './diagnosis';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/doctors/:id/:username" component={DoctorDetails} />
        <Route exact path="/appointments" component={AppointmentList} />
        <Route exact path="/doctors" component={DoctorList} />
        <Route exact path="/diagnosis" component={Diagnosis} />
        <Route exact path="/" component={HomePage} />
        <Route component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
