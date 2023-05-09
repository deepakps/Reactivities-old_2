// This is App which gets rendered inside src>index.tsx.
// Date - 10th Feb, 2023.
import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';

function App() {
  /* Code refactored & shifted to activityStore.ts. Date - 26th Apr, 2023.*/
  /* useLocation() will help to track locations of the URL. Date - 09th May, 2023. */
  const location = useLocation();

  return (
    <>
      {
        location.pathname === '/' ? <HomePage /> : (
          // 'Div' is replaced with 'Fragment'. Another reason is that we are not allowed to put two separate elements of same level inside react component.
          // Therefore, we need to have one parent Element i.e. 'Div' or 'Fragment'. Putting empty <> </> also indicate <Fragment> </Fragment>.
          // Date - 22nd Feb, 2023.
          <>
            {/* <div> */}
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              {/* <ActivityDashboard /> */}
              {/* Commented ActivityDashboard as Routing is implemented.
                  Here, Outlet is swapped with requested page(i.e. children of App component). 
                  Date - 04th May, 2023. */}
              <Outlet />
            </Container>
            {/* </div> */}
          </>
        )}
    </>
  )
}

export default observer(App);
