import React from 'react';

const WizardSteps = () => (
  <div>
    <h3>Hello!</h3>
    <p>
      You’re about to use a short (2 min), safe and anonymous injury checkup.
      Your answers will be carefully analyzed and you’ll learn about possible
      causes of your symptoms.
    </p>
    <div>
      <h4>Free checkup requires 4 simple steps:</h4>
      <ul>
        <li>
          <strong>Choose an inujred area. </strong>
          Select the injured body part or affected area.
        </li>
        <li>
          <strong>Choose related symptoms. </strong>
          Choose all related symptoms you experience.
        </li>
        <li>
          <strong>Biodata (Optional). </strong>
          Provide some biodata.
        </li>
        <li>
          <strong>Results. </strong>
          Preview your results.
        </li>
      </ul>
    </div>
    <div>
      <h3>Terms of Use:</h3>
      <p>By using the free checkup, You agree to the following:</p>
      <ul>
        <li>
          <strong>Checkup is not a diagnosis. </strong>
          Checkup is for informational purposes and is not a qualified medical
          opinion.
        </li>
        <li>
          <strong>Do not use in emergencies. </strong>
          In case of injury emergency, contact a physiotherapist or your team’s
          emergency number immediately.
        </li>
        <li>
          <strong>Your data is safe. </strong>
          Information that you provide is anonymous and not shared with anyone.
          You can choose to save your diagnosis afterwards.
        </li>
      </ul>
    </div>
  </div>
);

export default WizardSteps;
