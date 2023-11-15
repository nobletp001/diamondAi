import { useState } from 'react'

import './App.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 

  return (
    <>
<Provider store={store}>
<ToastContainer />

<RouterProvider router={router} />
</Provider>
    </>
  )
}

export default App
