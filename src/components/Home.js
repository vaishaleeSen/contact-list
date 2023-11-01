import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Importing hooks for Redux
import { Link } from 'react-router-dom'; // Importing Link for routing
import { toast } from 'react-toastify'; // Importing toast notifications

const Home = () => {
    const contacts = useSelector(state => state); // Accessing contacts from Redux store
    const dispatch = useDispatch(); // Obtaining dispatch function from Redux

    // Deleting a contact by its ID
    const deleteContact = (id) => {
        dispatch({ type: 'DELETE_CONTACT', payload: id });
        toast.success('Contact deleted successfully!');
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12 my-5 text-end'>
                    <Link to='/add' className='btn btn-outline-dark'>Add Contact</Link>
                </div>
                <div className='col-md-10 mx-auto'>
                    {/* Table to display the contact list */}
                    <table className='table table-hover'>
                        <thead className='text-white bg-dark text-center'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Email</th>
                                <th scope='col'>Number</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapping through contacts and displaying each contact's information */}
                            {contacts.map((contact, id) => (
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.number}</td>
                                    <td>
                                        {/* Edit and Delete buttons for each contact */}
                                        <Link to={`/edit/${contact.id}`} className='btn btn-small btn-primary me-2'>Edit</Link>
                                        <button type='button' onClick={() => deleteContact(contact.id)} className='btn btn-small btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
