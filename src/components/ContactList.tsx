import React, { useState, useEffect, useRef } from 'react'
import { ConnectedProps, connect } from "react-redux"
import { Contact, IExtraDispatchArguments } from '../types'
import ContactListItem from './ContactListItem'
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from '../redux/store'

const mapStateToProps = (state: RootState) => {
  return {
    contacts: state,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, IExtraDispatchArguments, AnyAction>) => {
  return {
    
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  
}

const ContactList: React.FC<Props> = props => {
  return props.contacts.length ?
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(9rem,_1fr))] gap-3 mt-6">
      {props.contacts.map((contact: Contact) =>
        <ContactListItem key={contact.id} render={contact} />
      )}
    </div> :
    <div className="flex mt-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <div className="">
        <h3 className="mt-0">No Contact Found!</h3>
        <p className="">Please add contact from <label htmlFor="AddContact"><a className="link link-primary no-underline" tabIndex={0}>Create Contact</a></label> button</p>
      </div>
    </div>
}

export default connector(ContactList)
