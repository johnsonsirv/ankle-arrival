import React from 'react';
import { NavLink } from 'react-router-dom';

const HomePage = () => (
  <>
    <div className="homePage">
      <p>
        Ankle Arrival provides your team with medical insight into sports
        related injuries, and guides them through a pre-diagnosis of thier
        symptoms.
      </p>
      <p>Designed for atheletes, teams, and sports care givers.</p>
      <div>
        <NavLink to="/login">Talk to a Doctor | </NavLink>
        <NavLink to="/diagnosis">Free Checkup</NavLink>
      </div>
      <div className="teams-seaction">
        <header>
          <h3>Ankle Arrival For Teams</h3>
        </header>
        <div>
          <h4>1. Injury Analysis</h4>
          <p>
            Provides your team with data of sports related injuries, and help
            them identify factors that contribute to player injury.
          </p>
        </div>
        <div>
          <h4>2. Symptom Analysis</h4>
          <p>
            Understand what your team&apos;s medical sysmptoms could mean and
            provide data for diagnosis.
          </p>
        </div>
        <div>
          <h4>3. Diagnosis</h4>
          <p>
            Identify the nature of injuiries or diseases your team experience
            backed by expert symptom evaluation.
          </p>
        </div>
        <div>
          <h4>4. Treatment / Lifestyle</h4>
          <p>
            Access to information on treatment or lifestyle to improve the
            overall health of your team
          </p>
        </div>
        <div>
          <h4>5. Artifical Intelligence</h4>
          <p>
            Operating as a domain specific expert system, it derives execution
            instruction from a set of data and rules and utilizes AI to support diagnosis.
          </p>
        </div>
        <div>
          <NavLink to="/diagnosis">Get Started Free</NavLink>
        </div>
      </div>
    </div>
  </>
);

export default HomePage;
