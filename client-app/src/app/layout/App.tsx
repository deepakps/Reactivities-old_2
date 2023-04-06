// This is App which gets rendered inside src>index.tsx.
// Date - 10th Feb, 2023.
import React, { useEffect, useState } from 'react';
/* Commented as it is obsolete now.
 Date - 21st Feb, 2023.
 import logo from './logo.svg';
 import './App.css';*/
// import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
// Commented demo code.
// Date - 11th Feb, 2023.
// import { ducks } from './demo';
// import DuckItem from './DuckItem';

// Date - 31st Mar, 2023.
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // When we make use of useEffect, we need to give some dependencies. Otherwise it could fire infinite times.
  // Therefore, adding second parameter as array in useEffect which will lead to execute only one time.
  // Date - 11th Feb, 2023.
  useEffect(() => {
    // axios.get<Activity[]>('http://localhost:5000/api/activities')
    //   .then(respose => {
    //     setActivities(respose.data);
    //   });
    // Implemented with Axios setup.
    // Date - 06th Apr, 2023.
    agent.Activities.list()
      .then(respose => {
        let activities: Activity[] = [];
        respose.forEach(activity => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        });
        setActivities(activities);
        setLoading(false);
      });
  }, []);

  // Date - 5th Mar, 2023.
  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  // Date - 5th Mar, 2023.
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  // Date - 5th Mar, 2023.
  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  // Date - 5th Mar, 2023.
  function handleFormClose() {
    setEditMode(false);
  }

  // Date - 31st Mar, 2023.
  function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(a => a.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    }
  }

  // Date - 31st Mar, 2023.
  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(a => a.id !== id)]);
  }

  if (loading) return <LoadingComponent content='Loading app...' />

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

      <NavBar openForm={handleFormOpen} />

      <Container style={{ marginTop: "7em" }}>
        {/* List & List.Item code shifted to ActivityDashboard.tsx.
            Date - 22nd Feb, 2023. */}
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting} />
      </Container>
      {/* </div> */}
    </>
  );
}

export default App;
