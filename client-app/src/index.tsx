import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { StoreContext, store } from './app/stores/store';

// div id="root" which is present in Public>index.html is retrieved below & then rendered.
// Date - 10th Feb, 2023.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  // We need to make use of provider as we are going to pass or make available to the entire App.
  // <App /> here will act like a child.
  // Date - 24th Apr, 2023.
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
