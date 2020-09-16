import React, { useReducer } from 'react';
import {v4 as uuid} from 'uuid'; //this is just to help provide dummy data to work with through dev
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [
            //dummy data to play with for now while we build before we attach our db
            {
                id: 1,
                name: 'Harry Potter',
                email: 'hp@mail.com',
                phone: '+44 123-1234',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Ron Weasley',
                email: 'rw@mail.com',
                phone: '+44 123-1255',
                type: 'personal'
            },
            {
                id: 3,
                name: 'Albus Dumblebore',
                email: 'ad@mail.com',
                phone: '+44 123-1111',
                type: 'professional'
            },
        ],
        // This is so when we click edit, whatever contact we click edit for is put into this piece of state,
        // so it will be an object, and then we can change things in the ui based on that
        current: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

//    Add Contact
    const addContact = contact => {
        contact.id = uuid;
        dispatch({ type: ADD_CONTACT, payload: contact });
    };

//    Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

//    Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

//    Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

//    Update Contact

//    Filter Contacts

//    Clear Filter

    // Here is where we return our provider so we can wrap the entire application with this context
    return (
        <ContactContext.Provider
          value={{
              contacts: state.contacts,
              current: state.current,
              addContact,
              deleteContact,
              setCurrent,
              clearCurrent
        }}>
            { props.children }
        </ContactContext.Provider>
    );
};

export default ContactState;
