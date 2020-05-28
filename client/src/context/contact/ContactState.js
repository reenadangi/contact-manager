import React,{ useReducer} from 'react';
import { v4 as uuid } from 'uuid';
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
            {id:3,
            name:"Mark",
            email:"sdsd",
            phone:"999-999-999",
            type:'professional'},
        ],
        current:null,
        filtered:null
    };
    const[state,dispatch]=useReducer(contactReducre,initialState);
    // add 
    const addContact = contact=>{
        contact.id=uuid();
        dispatch({type:ADD_CONTACT,payload:contact});

    }
    // delete
    const deleteContact = id=>{
        dispatch({type:DELETE_CONTACT,payload:id});
    }
    // set current
    const setCurrent = contact=>{
        dispatch({type:SET_CURRENT,payload:contact});
    }
   
    //clear current
    
     const clearCurrent = ()=>{
        dispatch({type:CLEAR_CURRENT});
    }
     // update Contact
     const updateContact = contact=>{
        dispatch({type:UPDATE_CONTACT,payload:contact});
    }
     // update Contact
     const filterContacts = text=>{
        dispatch({type:FILTER_CONTACT,payload:text});
    }
    const clearFilter = ()=>{
        dispatch({type:CLEAR_FILTER});
    }

    return(
        <ContactContext.Provider
           value={{
               contacts:state.contacts,
               current:state.current,
               filtered:state.filtered,
               addContact,
               deleteContact,
               updateContact,
               setCurrent,
               clearCurrent,
               filterContacts,
               clearFilter
              
           }}>
            {props.children}
        </ContactContext.Provider>
    )
};
export default ContactState;