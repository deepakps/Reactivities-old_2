// This is App which gets rendered inside src>index.tsx.
// Date - 10th Feb, 2023.
import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  /* Code refactored & shifted to activityStore.ts. Date - 26th Apr, 2023.*/

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...' />

  return (
    // 'Div' is replaced with 'Fragment'. Another reason is that we are not allowed to put two separate elements of same level inside react component.
    // Therefore, we need to have one parent Element i.e. 'Div' or 'Fragment'. Putting empty <> </> also indicate <Fragment> </Fragment>.
    // Date - 22nd Feb, 2023.
    <>
      {/* <div> */}
      <NavBar />

      <Container style={{ marginTop: "7em" }}>
        {/* List & List.Item code shifted to ActivityDashboard.tsx.
            Date - 22nd Feb, 2023. */}
        <ActivityDashboard />
      </Container>
      {/* </div> */}
    </>
  );
}

export default observer(App);
