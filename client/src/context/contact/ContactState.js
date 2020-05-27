import React,{ useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducre from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    SET_ALERT,
    REMOVE_ALERT

} from '../types';
const ContactState=props=>{
    const initialState={
        contacts:[
            {id:1,
            name:"reena",
            email:"sdsd",
            phone:"999-999-999",
            type:'personal'},
            {id:2,
            name:"bob",
            email:"sdsd",
            phone:"999-999-999",
            type:'personal'},
            {id:1,
            name:"Mark",
            email:"sdsd",
            phone:"999-999-999",
            type:'personal'},
        ]
    };
    const[state,dispatch]=useReducer(contactReducre,initialState);
    // add 
    // delete
    // set current
    //clear current
    return(
        <ContactContext.Provider>
           value={{
               contacts:state.contacts
           }}
            {props.children}
        </ContactContext.Provider>
    )
};
export default ContactState;