import React, {useContext, useEffect, useRef} from 'react';
import ContactContext from '../../context/contact/contactContext';



const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
   const text = useRef('');

    const { filterContacts, clearFilter, filtered } = contactContext;

    useEffect(() => {
       if (filtered === null) {
           text.current = '';
       }
    });

    const onChange = e => {
        //this gives us the value of the input
        if(text.current.value !== '') {

            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };


    return (
        <form>
            <input ref={text} type='text' placeholder='Filter Contacts...' onChange={onChange}/>
        </form>
    )
}

export default ContactFilter;