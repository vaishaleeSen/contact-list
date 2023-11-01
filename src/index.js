import React from 'react';
import { createRoot } from 'react-dom/client'; // React Concurrent Mode for rendering
import App from './App'; // Importing the main App component

import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import 'react-toastify/dist/ReactToastify.css'; // Importing React Toastify CSS
import { BrowserRouter as Router } from 'react-router-dom'; // Importing Browser Router for routing
import { createStore } from 'redux'; // Importing createStore function for Redux
import contactReducer from './redux/reducers/contactReducer'; // Importing the contactReducer
import { composeWithDevTools } from 'redux-devtools-extension'; // Enhancing Redux DevTools integration
import { Provider } from 'react-redux'; // Providing Redux store to React components

// Creating the Redux store with the contactReducer and DevTools integration
const store = createStore(contactReducer, composeWithDevTools());

// Creating a root for rendering using React Concurrent Mode
const root = createRoot(document.querySelector('#root'));

// Rendering the main application inside the root
root.render(
    <Provider store={store}> {/* Providing the Redux store to the entire application */}
        <Router> {/* Wrapping the entire application with BrowserRouter for routing */}
            <App /> {/* Mounting the main App component */}
        </Router>
    </Provider>
);
