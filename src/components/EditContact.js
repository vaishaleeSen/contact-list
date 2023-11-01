import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks for Redux
import { Link, useNavigate, useParams } from 'react-router-dom'; // Importing hooks for routing
import { toast } from 'react-toastify'; // Importing toast notifications

const EditContact = () => {
    const [name, setName] = useState(''); // State for contact name
    const [email, setEmail] = useState(''); // State for contact email
    const [number, setNumber] = useState(''); // State for contact number

    const { id } = useParams(); // Extracting 'id' from URL params

    const contacts = useSelector(state => state); // Accessing contacts from Redux store
    const dispatch = useDispatch(); // Obtaining dispatch function from Redux
    const navigate = useNavigate(); // Accessing navigation function from react-router-dom

    // Finding the current contact to edit based on 'id'
    const currentContact = contacts.find(contact => contact.id === parseInt(id));

    // Pre-filling form fields with current contact data when available
    useEffect(() => {
        if (currentContact) {
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }
    }, [currentContact]);

    // Handling form submission to update the contact
    const handleSubmit = e => {
        e.preventDefault();

        // Checking for existing email and phone number among other contacts
        const checkEmail = contacts.find(contact => contact.id !== parseInt(id) && contact.email === email);
        const checkNumber = contacts.find(contact => contact.id !== parseInt(id) && contact.number === parseInt(number));

        // Validating empty fields
        if (!email || !number || !name) {
            return toast.warning("Please fill in all fields!");
        }

        // Displaying an error message if the email already exists
        if (checkEmail) {
            return toast.error("This email already exists!");
        }

        // Displaying an error message if the phone number already exists
        if (checkNumber) {
            return toast.error("This number already exists!");
        }

        // Creating updated contact data
        const data = {
            id: parseInt(id),
            name,
            email,
            number
        };

        // Dispatching the updated contact data to the Redux store
        dispatch({ type: 'UPDATE_CONTACT', payload: data });

        // Displaying a success message and navigating back to the home page
        toast.success("Contact updated successfully!!");
        navigate('/');
    };

    return (
        <div className='container'>
            {currentContact ? ( // Checking if the current contact exists
                <>
                    <h1 className='display-3 text-center fw-bold'>Edit Contact {id}</h1>
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
                                    {/* Button to update contact and link to cancel and go back */}
                                    <input type='submit' value='Update Contact' className='btn btn-dark' />
                                    <Link to='/' className='btn btn-danger ms-3 '>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className='display-3 my-5 text-center fw-bold'>Contact with id {id} does not exist!!</h1>
            )}
        </div>
    );
};

export default EditContact;
