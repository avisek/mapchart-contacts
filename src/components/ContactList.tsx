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
    <div>
      {props.contacts.map((contact: Contact) =>
        <ContactListItem key={contact.id} render={contact} />
      )}
    </div> :
    <div>No Contacts Found!</div>
}

export default connector(ContactList)
