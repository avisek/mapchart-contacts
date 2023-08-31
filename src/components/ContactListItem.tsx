import React, { useState, useEffect, useRef } from 'react'
import { ConnectedProps, connect } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from '../redux/store'
import { Contact, Statuses, IExtraDispatchArguments } from '../types'
import { addContact, deleteContact } from "../redux/reducer"
import { Route, Routes, useSearchParams } from 'react-router-dom'

const mapStateToProps = (state: RootState) => {
  return {
    contacts: state,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, IExtraDispatchArguments, AnyAction>) => {
  return {
    deleteContact: (id: number) => dispatch(deleteContact(id)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  render: Contact
}

const ContactListItem: React.FC<Props> = ({
  render: contact,
  deleteContact
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const handleViewContact = () => {
    setSearchParams({view: String(contact.id)})
  }
  
  const handleEditContact = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setSearchParams({edit: String(contact.id)})
  }
  
  const handleDeleteContact = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    deleteContact(contact.id as number)
  }
  
  return (
    <div onClick={handleViewContact} className='bg-base-200 m-3 p-3'>
      <div className='text-2xl'>{contact.firstName} {contact.lastName}</div>
      <div>{contact.status === Statuses.Active ? 'Active' : 'Inactive'}</div>
      <div>
        <button onClick={handleEditContact} className="btn btn-info">Edit</button>
        <button onClick={handleDeleteContact} className="btn btn-error">Delete</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem)
