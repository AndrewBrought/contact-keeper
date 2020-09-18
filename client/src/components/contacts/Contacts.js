import React, {Fragment, useContext} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const {contacts, filtered} = contactContext;

    if (contacts.length === 0) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {/*We're pulling filtered and contacts out, checking if there's anything in filtered,
            if there is (!== null), then we map filtered and show the contact item...if there's nothing
            in filtered, then we're going to show the contacts*/}
                {filtered !== null ? filtered.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>
                            <ContactItem contact={contact}/>
                        </CSSTransition>
                    ))
                    : contacts.map(contact => (
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>
                            <ContactItem contact={contact}/>
                        </CSSTransition>
                    ))}
            </TransitionGroup>
        </Fragment>
    )
}

export default Contacts;