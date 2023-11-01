import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from 'react-router-dom';

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import { useDispatch } from "react-redux";

const App = () => {
    // Accessing the dispatch function from Redux for state management
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch data from a sample API and update Redux store when component mounts
        const fetchData = async () => {
            try {
                // Making an API call to fetch data (in this case, from jsonplaceholder.typicode.com)
                const response = await fetch('https://jsonplaceholder.typicode.com/users/');
                const json = await response.json();
                
                // Mapping fetched API data to the desired format for contact information
                const data = json.map((contact) => {
                    return {
                        id: contact.id,
                        name: contact.name,
                        number: contact.phone,
                        email: contact.email
                    };
                });

                // Dispatching the fetched and formatted data to Redux store for global access
                dispatch({ type: 'FETCH_CONTACTS', payload: data });
            } catch (error) {
                // Handling errors in case of failed data retrieval
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Invoking the data fetching function
    }, [dispatch]); // Running the useEffect when 'dispatch' changes

    return (
        <div className="App">
            {/* Displaying toast notifications for user alerts */}
            <ToastContainer />
            
            {/* Rendering the navigation bar component */}
            <Navbar />
            
            {/* Setting up routes for different components using react-router-dom */}
            <Routes>
                {/* Route to display the Home component */}
                <Route exact path="/" element={<Home />} />
                
                {/* Route to the AddContact component */}
                <Route path="/add" element={<AddContact />} />
                
                {/* Route to the EditContact component, with a dynamic parameter 'id' */}
                <Route path="/edit/:id" element={<EditContact />} />
            </Routes>
        </div>
    );
}

export default App;
