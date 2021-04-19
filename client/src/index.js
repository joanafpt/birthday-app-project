import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { StateInspector } from 'reinspect';
import reportWebVitals from './reportWebVitals';
import { RecordsStoreProvider } from './store/RecordsStoreProvider';
import initialState from './store/initialState';
import recordsReducer from './store/recordsReducer';
import App from './App';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <StateInspector>
        <RecordsStoreProvider
          initialState={initialState}
          recordsReducer={recordsReducer}
        >
          <App />
        </RecordsStoreProvider>
      </StateInspector>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
