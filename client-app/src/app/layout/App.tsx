// This is App which gets rendered inside src>index.tsx.
// Date - 10th Feb, 2023.
import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {
  /* Code refactored & shifted to activityStore.ts. Date - 26th Apr, 2023.*/

  return (
    // 'Div' is replaced with 'Fragment'. Another reason is that we are not allowed to put two separate elements of same level inside react component.
    // Therefore, we need to have one parent Element i.e. 'Div' or 'Fragment'. Putting empty <> </> also indicate <Fragment> </Fragment>.
    // Date - 22nd Feb, 2023.
    <>
      {/* <div> */}
      <NavBar />

      <Container style={{ marginTop: "7em" }}>
        {/* Commented ActivityDashboard as Implemented Routing.
        Here, Outlet is swapped with requested page. 
        Date - 04th May, 2023. */}
        <Outlet />
      </Container>
      {/* </div> */}
    </>
  );
}

export default observer(App);
