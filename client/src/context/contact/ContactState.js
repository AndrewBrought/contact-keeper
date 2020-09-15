import React, { useReducer } from 'react';
import uuid from 'uuid'; //this is just to help provide dummy data to work with through dev
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
        ]
    }
}