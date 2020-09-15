import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;

    return (
        <Fragment>
            {/*we'r'e going to embed this on our homepage*/}
            {contacts.map(contact => (
                <h3>{contact.name}</h3>
            ))}
        </Fragment>
    )
}

export default Contacts;