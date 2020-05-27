// racf
import React, {Fragment, useContext} from 'react';
import ConatactContext from '../../context/contact/contactContext'

export const Contacts = () => {
    const contactContext=useContext(ConatactContext);
    const {contacts} =contactContext;
    return (
        <div>
            <Fragment>
            {
            contacts.map(contact=> <h3>{contact.name}</h3>)
            }
            </Fragment>
        </div>
    )
}
export default Contacts;