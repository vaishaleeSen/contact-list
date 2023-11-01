import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks for Redux
import { useNavigate } from 'react-router-dom'; // Importing the routing hook
import { toast } from 'react-toastify'; // Importing toast notifications

const AddContact = () => {
    // Using state hooks to manage input field values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');

    // Accessing contacts from Redux store
    const contacts = useSelector(state => state);

    // Obtaining dispatch function from Redux
    const dispatch = useDispatch();

    // Accessing navigation function from react-router-dom
    const navigate = useNavigate();

    // Handling form submission
    const handleSubmit = e => {
        e.preventDefault();

        // Checking if the email or phone number already exist in the contacts list
        const checkEmail = contacts.find(contact => contact.email === email && email);
        const checkNumber = contacts.find(contact => contact.number === parseInt(number) && number);

        // Validation for empty fields
        if (!email || !number || !name) {
            return toast.warning('Please fill in all fields!');
        }

        // Displaying an error message if the email already exists
        if (checkEmail) {
            return toast.error('This email already exists!');
        }

        // Displaying an error message if the phone number already exists
        if (checkNumber) {
            return toast.error('This number already exists!');
        }

        // Creating new contact data
        const data = {
            id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
            name,
            email,
            number
        };

        // Dispatching the new contact data to the Redux store
        dispatch({ type: 'ADD_CONTACT', payload: data });

        // Displaying a success message and navigating back to the home page
        toast.success('Contact added successfully!');
        navigate('/');
    };

    return (
        <div className='container'>
            <h1 className='display-3 text-center fw-bold'>Add Contact</h1>
            <div className='row'>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form className='text-center' onSubmit={handleSubmit}>
                        {/* Input fields for name, email, and phone number */}
                        <div className='form-group mb-3'>
                            <input type='text' placeholder='Name' className='form-control'
                                value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='email' placeholder='Email' className='form-control'
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='number' placeholder='Phone Number' className='form-control'
                                value={number} onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className='form-group mb-3'>
                            <input type='submit' value='Add Contact' className='btn btn-block btn-dark' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddContact;
