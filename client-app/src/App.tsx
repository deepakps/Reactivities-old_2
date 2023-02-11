// This is App which gets rendered inside src>index.tsx.
// Date - 10th Feb, 2023.
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
// Commented demo code.
// Date - 11th Feb, 2023.
// import { ducks } from './demo';
// import DuckItem from './DuckItem';

function App() {
  const [activities, setActivities] = useState([]);

  // When we make use of useEffect, we need to give some dependencies. Otherwise it could fire infinite times.
  // Therefore, adding second parameter as array in useEffect which will lead to execute only one time.
  // Date - 11th Feb, 2023.
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(respose => {
        // console.log(respose);
        setActivities(respose.data);
      });
  }, []);

  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      {/* {ducks.map(duck => (
          // When we are looping over in react then you will need to assign key for opening element.
          // Date - 11th Feb, 2023. 
          <DuckItem duck={duck} key={duck.name} />
        ))} */}
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
