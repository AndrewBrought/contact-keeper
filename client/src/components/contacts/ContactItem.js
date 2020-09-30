import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({contact}) => {
    const contactContext = useContext(ContactContext);
    const {deleteContact, setCurrent, clearCurrent} = contactContext;

    const {_id, name, email, phone, linkedIn, facebook, instagram, twitter, type} = contact;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    };


    let OSName = "UnknownOS";
    if (navigator.platform.indexOf("Mac") !== -1) OSName = "MacOS";
    if (navigator.platform.indexOf("iPhone") !== -1) OSName = "iOS";
    if (navigator.platform.indexOf("Android") !== -1) OSName = "Android";
    if (navigator.platform.indexOf("Win") !== -1) OSName = "Windows";

    const tagLinkInstagram = () => {
        // if (OSName === "iOS") {
        //     return <a href={`instagram://user?username=${instagram}`}> {instagram}</a>;
        // } else
        if (OSName === "MacOS") {
            return <a href={`https://www.instagram.com/${instagram}`} target="_blank"> {instagram}</a>;
        } else if (OSName === "Windows") {
            return <a href={`https://www.instagram.com/${instagram}`} target="_blank"> {instagram}</a>;
        } else if (OSName === 'iOS') {

            // let iosLink = `instagram://user?username=${instagram}`
            // iosLink = "apps.apple.com/us/app/instagram/id389801252";
            // iosLink = 'https://www.instagram.com/';
            let iosLink = "";

            setTimeout(function () {
                iosLink = `https://www.instagram.com/${instagram}`;
            }, 25);
            iosLink = `instagram://user?username=${instagram}`;

            return <a href={iosLink}> {instagram}</a>
        }
    }
            // const tagLinkFacebook = () => {
            //     if (OSName === "iOS") {
            //         return <a href={`facebook://user?username=${facebook}`}> {facebook}</a>;
            //     } else if (OSName === "MacOS") {
            //         return <a href={`https://www.facebook.com/${facebook}`} target="_blank"> {facebook}</a>;
            //     } else if(OSName === "Windows") {
            //         return <a href={`https://www.facebook.com/${facebook}`} target="_blank"> {facebook}</a>;
            //     } else if(OSName === "Android") {
            //         return <a href={`facebook://user?username=${facebook}`}> {facebook}</a>;
            //     }
            // }

            // const tagLinkTwitter = () => {
            //     if (OSName === "iOS") {
            //         return <a href={`twitter://user?username=${twitter}`}> {twitter}</a>;
            //     } else if (OSName === "MacOS") {
            //         return <a href={`https://www.twitter.com/${twitter}`} target="_blank"> {twitter}</a>;
            //     } else if(OSName === "Windows") {
            //         return <a href={`https://www.twitter.com/${twitter}`} target="_blank"> {twitter}</a>;
            //     } else if(OSName === "Android") {
            //         return <a href={`twitter://user?username=${twitter}`}> {twitter}</a>;
            //     }
            // }

            const tagLinkLinedIn = () => {
                if (OSName === "iOS") {
                    return <a href={`linkedin://user?username=${linkedIn}`}> {linkedIn}</a>;
                } else if (OSName === "MacOS") {
                    return <a href={`https://www.linkedin.com/in/${linkedIn}`} target="_blank"> {linkedIn}</a>;
                } else if (OSName === "Windows") {
                    return <a href={`https://www.linkedin.com/in/${linkedIn}`} target="_blank"> {linkedIn}</a>;
                } else if (OSName === "Android") {
                    return <a href={`linkedin://user?username=${linkedIn}`}> {linkedIn}</a>;
                }
            }

            return (
                <div className='card bg-light'>
                    <h3 className="text-primary text-left">
                        {name}{' '} <span style={{float: 'right'}}
                                          className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                    </h3>
                    <ul className='list'>

                        {email && (<li>
                            <i className="fas fa-envelope-open"/> <a href={`mailto:${email}`}>{email}</a>
                        </li>)}

                        {phone && (<li>
                            <i className="fas fa-phone"/> <a href={`tel:${phone}`}>{phone}</a>
                        </li>)}

                        {linkedIn && (<li>
                            <i className="fab fa-linkedin"/>
                            {tagLinkLinedIn()}
                            {/*<a href={`https://l.linklyhq.com/l/7PG7${linkedIn}`} target="_blank"> {linkedIn}</a>*/}

                        </li>)}

                        {facebook && (<li>
                            <i className="fab fa-facebook-square"/>

                            {/*{tagLinkFacebook()}*/}
                            <a href={`https://www.facebook.com/${facebook}`} target="_blank"> {facebook}</a>
                        </li>)}

                        {instagram && (<li>
                            <i className="fab fa-instagram"/>
                            {tagLinkInstagram()}

                        </li>)}

                        {twitter && (<li>
                            <i className="fab fa-twitter-square"/>
                            {/*{tagLinkTwitter()}*/}
                            <a href={`https://www.twitter.com/${twitter}`} target="_blank"> {twitter}</a>
                        </li>)}

                    </ul>
                    <p>
                        <button className="btn btn-dark btn-sm" onClick={() => setCurrent(contact)}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
                    </p>
                </div>
            );
        }
        ;

        ContactItem.propTypes = {
            contact: PropTypes.object.isRequired,
        }

        export default ContactItem;