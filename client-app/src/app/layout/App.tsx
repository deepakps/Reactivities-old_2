// This is App which gets rendered inside src>index.tsx.
// Date - 10th Feb, 2023.
import React, { Fragment, useEffect, useState } from 'react';
/* Commented as it is obsolete now.
 Date - 21st Feb, 2023.
 import logo from './logo.svg';
 import './App.css';*/
import axios from 'axios';
import { Container, Header } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
// Commented demo code.
// Date - 11th Feb, 2023.
// import { ducks } from './demo';
// import DuckItem from './DuckItem';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  // When we make use of useEffect, we need to give some dependencies. Otherwise it could fire infinite times.
  // Therefore, adding second parameter as array in useEffect which will lead to execute only one time.
  // Date - 11th Feb, 2023.
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(respose => {
        // console.log(respose);
        setActivities(respose.data);
      });
  }, []);

  return (
    // 'Div' is replaced with 'Fragment'. Another reason is that we are not allowed to put two separate elements of same level inside react component.
    // Therefore, we need to have one parent Element i.e. 'Div' or 'Fragment'. Putting empty <> </> also indicate <Fragment> </Fragment>.
    // Date - 22nd Feb, 2023.
    <>
      {/* <div> */}
      {/* Commented as part of Semantic UI changes.
      Date - 22nd Feb, 2023. */}
      {/* <Header as='h2' icon='users' content='Reactivities' /> */}

      {/* Demo code. */}
      {/* {ducks.map(duck => (
          // When we are looping over in react then you will need to assign key for opening element.
          // Date - 11th Feb, 2023. 
          <DuckItem duck={duck} key={duck.name} />
        ))} */}

      <NavBar />

      <Container style={{ marginTop: "7em" }}>
        <List>
          {activities.map(activity => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
      </Container>
      {/* </div> */}
    </>
  );
}

export default App;