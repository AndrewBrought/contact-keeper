import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: null,
        // This is so when we click edit, whatever contact we click edit for is put into this piece of state,
        // so it will be an object, and then we can change things in the ui based on that
        current: null,
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

//    Get Contacts
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts');

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }

    };

//    Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
           const res = await axios.post('/api/contacts', contact, config);

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }

    };

//    Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

//    Clear Contacts
    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS });
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
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

//    Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

//    Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Here is where we return our provider so we can wrap the entire application with this context
    return (
        <ContactContext.Provider
          value={{
              contacts: state.contacts,
              current: state.current,
              filtered: state.filtered,
              error: state.error,
              addContact,
              deleteContact,
              setCurrent,
              clearCurrent,
              updateContact,
              filterContacts,
              clearFilter,
              getContacts,
              clearContacts
        }}>
            { props.children }
        </ContactContext.Provider>
    );
};

export default ContactState;
