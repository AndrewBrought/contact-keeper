import React, { useContext, useEffect, useState } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    const { addContact, updateContact, clearCurrent, current } = contactContext;

    useEffect(() => {
        if(current !== null) {
            //setContact fills the form with whatever we want, the current value is the object, the complete contact
            // of whatever contact is clicked
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                linkedIn: '',
                facebook: '',
                instagram: '',
                twitter: '',
                type: 'personal'
            });
        }
    //    Adding our dependencies in the brackets we only need these if either is changed
    }, [contactContext, current]);

    //this contact is the state of the form
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        linkedIn: '',
        facebook: '',
        instagram: '',
        twitter: '',
        type: 'personal'
    });

    const { name, email, phone, linkedIn, facebook, instagram, twitter, type } = contact;

    const onChange = e => setContact({...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if(current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
        }
        clearAll();
        // setContact({
        //     name: '',
        //     email: '',
        //     phone: '',
        //     type: 'personal'
        // });
    };

    const clearAll = () => {
        clearCurrent();
    };

    return (
        <form onSubmit={onSubmit}>
           <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input
                type="text"
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type="email"
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <h4>LinkedIn</h4>
            <input
                type="text"
                placeholder='URL Name (ex: First-nameLast-name)'
                name='linkedIn'
                value={linkedIn}
                onChange={onChange}
            />
            <h4>Facebook</h4>
            <input
                type="text"
                placeholder='URL Name (ex: first-name.last-name)'
                name='facebook'
                value={facebook}
                onChange={onChange}
            />
            <h4>Instagram</h4>
            <input
                type="text"
                placeholder='URL Name (ex: First-nameLast-name)'
                name='instagram'
                value={instagram}
                onChange={onChange}
            />
            <h4>Twitter</h4>
            <input
                type="text"
                placeholder='URL Name (ex: First-nameLast-name)'
                name='twitter'
                value={twitter}
                onChange={onChange}
            />
            <h4>Contact Type</h4>
            <input type='radio'
                   name='type'
                   value='personal'
                   checked={type === 'personal'}
                   onChange={onChange}
            /> Personal
            {' '}
            <input type='radio'
                   name='type'
                   value='professional'
                   checked={type === 'professional'}
                   onChange={onChange}
            /> Professional
            <div>
                <input type="submit"
                       value={current ? 'Update Contact' : 'Add Contact'}
                       className='btn btn-primary btn-block'/>
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    );
};

export default ContactForm;