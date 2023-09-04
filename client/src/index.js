import React from 'react';
import ReactDOM from 'react-dom/client';
import { store, persistor } from './store/redux'
import {Provider} from 'react-redux'
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
);
