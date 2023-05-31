import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

const App = () => {
  return (
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
  );
}
export default App;
