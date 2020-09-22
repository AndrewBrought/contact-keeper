import React, {Fragment, useContext, useEffect} from 'react';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Spinner from '../layout/Spinner';
import ContactItem from "./ContactItem";
import ContactContext from '../../context/contact/contactContext';
// import { motion } from "framer-motion";


const Contacts = () => {
    const contactContext = useContext(ContactContext);

    const { contacts, filtered, getContacts, loading } = contactContext;

    useEffect(() => {
        getContacts();
    //    eslint-disable-next-line
    }, []);

    if (contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact</h4>
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {/*We're pulling filtered and contacts out, checking if there's anything in filtered,
            if there is (!== null), then we map filtered and show the contact item...if there's nothing
            in filtered, then we're going to show the contacts*/}
                    {filtered !== null ? filtered.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact}/>
                            </CSSTransition>
                        ))
                        : contacts.map(contact => (
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact}/>
                            </CSSTransition>
                        ))}
                </TransitionGroup>
            ) : <Spinner />}

        </Fragment>
    )

    // return (
    //     <Fragment>
    //         {filtered !== null
    //             ? filtered.map(contact => (
    //                 <motion.div
    //                     key={contact.id}
    //                     layout
    //                     initial={{opacity:0}}
    //                     animate={{‌opacity: 1}}
    //                     transition={‌{delay: 0.2}} >
    //                     <ContactItem contact={contact} />
    //                 </motion.div>
    //             ))
    //             : contacts.map(contact => (
    //                 <motion.div
    //                     key={contact.id}
    //                     layout
    //                     initial={{‌ opacity: 0 }}
    //                     animate={{‌ opacity: 1 }}
    //                     transition={{‌ delay: 0.2, }} >
    //                     <ContactItem contact={contact} />
    //                 </motion.div>
    //             ))}
    //     </Fragment>
    // );
}





export default Contacts;