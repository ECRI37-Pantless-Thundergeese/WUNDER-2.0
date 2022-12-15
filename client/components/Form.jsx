import React, { _useEffect, useState } from 'react';
import axios from 'axios';
// import { CodeSlash } from 'react-bootstrap-icons';
import parkcodes from '../public/parkcodes.js';
// import ParkTally from './parkTally.jsx';

// const useInput = (init) => {
//   const [value, setValue] = useState(init);
//   const onChange = (e) => {
//     setValue(e.target.value);
//   };
//   //return the value with the onChange function instead of setValue;
//   return [value, onChange];
// };

const Sidebar = (props) => {
  const [date, setDate] = useState('');
  const [activities, setActivities] = useState({
    biking: false,
    camping: false,
    climbing: false,
    fishing: false,
    guided: false,
    hiking: false,
    paddling: false,
    snorkeling: false,
    swimming: false,
    wildlife: false,
  });

  const [parkCode, setParkCode] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  function toggleActivities(item) {
    // console.log('checkbox for item clicked', item);
    activities[item] = !activities[item];
    // console.log('activities state is: ', activities);
  }
  // console.log(props)

  function savePark(e) {
    e.preventDefault();
    //prevents form submission without park and date selected
    if (parkCode == '' || date === '') {
      setError('Please make sure a park and date are selected');
    } else {
      //puts activities checked off into array
      const activitiesDone = [];
      for (let item in activities) {
        activities[item] && activitiesDone.push(item);
      }
      // console.log({ parkCode, date, activitiesDone, notes });
      axios.post(`http://localhost:3000/home/user/${parkCode}`, { parkCode, date, activitiesDone, notes }, { withCredentials: true })
        .then(window.location.reload(false))
        .then((data) => { })
        .catch((err) => console.log('AddPark fetch POST to api: ERROR: ', err));
    }
  }

  // declare parkOptionsArr
  const parkOptions = [];
  // iterate through the parkcodes js file
  for (let park in parkcodes) {
    const { codes } = props
    if (!codes.includes(parkcodes[park])) {
      parkOptions.push(<option value={parkcodes[park]}>{park}</option>);
    }
  }

  const activityOptions = ['biking', 'camping', 'climbing', 'fishing', 'guided', 'hiking', 'paddling', 'snorkeling', 'swimming', 'wildlife']

  const activityCheckbox = [];

  // activityOptions.forEach((element) => {
  //   activityCheckbox.push(
  //     <input
  //       type="checkbox"
  //       id={element}
  //       value={activities[element]}
  //       onChange={(e) => toggleActivities(e.target.id)}
  //     />{ ' '}
  //   < label htmlFor = { element } > { element[0].toUpperCase() + element.substring(1) }</label >
  // )
  // }
  // )


  // render an option element for Select, pass in the parkCode value as value, and give the label/input as the parkCode key

  return (
    <div id="form">
      <form className="form">
        <h2>Log a trip</h2>
        <div className="select-dropdown">
          <select
            name="park"
            id="park"
            className="select-dropdown"
            value={parkCode}
            onChange={(e) => setParkCode(e.target.value)}
          >
            <option value="">Select Park:</option>
            {parkOptions}
          </select>
        </div>

        <h3>Date Visited:</h3>
        <input
          name="date"
          type="date"
          id="date_visited"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <h3>Activities Done</h3>
        <div className="checkboxes">
          <input
            type="checkbox"
            id="biking"
            value={activities.biking}
            onChange={(e) => toggleActivities(e.target.id)}
          />{' '}
          <label htmlFor="biking">Biking</label>
          <input
            type="checkbox"
            id="camping"
            value={activities.camping}
            onChange={(e) => toggleActivities(e.target.id)}
          />{' '}
          <label htmlFor="camping">Camping</label>
          <input
            type="checkbox"
            id="climbing"
            value={activities.climbing}
            onChange={(e) => toggleActivities(e.target.id)}
          />{' '}
          <label htmlFor="climbing">Climbing</label>
          <input
            type="checkbox"
            id="fishing"
            value={activities.fishing}
            onChange={(e) => toggleActivities(e.target.id)}
          />{' '}
          <label htmlFor="">Fishing</label>
          <input
            type="checkbox"
            id="guided"
            value={activities.guided}
            onChange={(event) => toggleActivities(event.target.id)}
          />{' '}
          <label htmlFor="guided">Guided Tours</label>
          <input
            type="checkbox"
            id="hiking"
            value={activities.hiking}
            onChange={(event) => toggleActivities(event.target.id)}
          />{' '}
          <label htmlFor="hiking">Hiking</label>
          <input
            type="checkbox"
            id="paddling"
            value={activities.paddling}
            onChange={(event) => toggleActivities(event.target.id)}
          />{' '}
          <label htmlFor="">Paddling</label>
          <input
            type="checkbox"
            id="snorkeling"
            value={activities.snorkeling}
            onChange={(event) => toggleActivities(event.target.id)}
          />{' '}
          <label htmlFor="snorkeling">Snorkeling</label>
          <input
            type="checkbox"
            id="swimming"
            value={activities.swimming}
            onChange={(event) => toggleActivities(event.target.id)}
          />{' '}
          <label htmlFor="swimming">Swimming</label>
          <input
            type="checkbox"
            id="wildlife"
            value={activities.wildlife}
            onChange={(event) => toggleActivities(event.target.id)}
          />{' '}
          <label htmlFor="wildlife">Wildlife</label>
        </div>
        <h3>Notes:</h3>
        <textarea
          className="comments"
          name="notes"
          placeholder="Weather was great, but the crowd wasn't..."
          rows="10"
          cols="28"
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
        {/* <h3>Overall Rating</h3>
        <p>Stretch Feature to click on stars</p>
        <ul>
          <h3>Parks you've visited</h3>
        </ul>
        <li>Stretch Feature</li>
        <li>Stretch Feature</li>
        <li>Stretch Feature</li> */}

        <input type="submit" id="submit" value="Save Park" onClick={savePark}>
        </input>
        {error ? <span className="errorMsg">{error}</span> : null}
      </form>
      {/* <ParkTally /> */}
    </div>
  );
};

export default Sidebar;
