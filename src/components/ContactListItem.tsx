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
  
  const { id, lastName, firstName, status } = contact
  
  const isActive = status === Statuses.Active
  
  const [searchParams, setSearchParams] = useSearchParams()
  
  const handleViewContact = () => {
    setSearchParams({view: String(id)})
  }
  
  const handleEditContact = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setSearchParams({edit: String(id)})
  }
  
  const handleDeleteContact = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    deleteContact(id as number)
  }
  
  return (
    <div onClick={handleViewContact} className='bg-base-200 hover:bg-base-300 transition-colors cursor-default p-3 rounded-lg'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor" className="w-16 h-w-16">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <h3 className='mt-0'>{firstName}<br />{lastName}</h3>
      <div className={`badge ${isActive ? 'badge-success' : 'badge-neutral'}`}>{isActive ? 'Active' : 'Inactive'}</div>
      <div className="grid grid-cols-2 gap-1 mt-3">
        <button onClick={handleEditContact} className="btn btn-info btn-sm rounded-md">Edit</button>
        <button onClick={handleDeleteContact} className="btn btn-error btn-sm rounded-md">Delete</button>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem)
