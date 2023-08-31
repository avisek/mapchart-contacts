import React, { useState, useEffect } from 'react'
import { ConnectedProps, connect } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from '../redux/store'
import { deleteContact } from "../redux/reducer"
import { useSearchParams } from 'react-router-dom'
import Modal from './Modal'
import { Contact, IExtraDispatchArguments, Statuses } from '../types'

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
  contacts: Contact[]
}

const ViewContactModal: React.FC<Props> = ({contacts, deleteContact}) => {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const contactId = searchParams.get('view')
  const isOpen = contactId !== null
  
  const [contact, setContact] = useState<Contact | null>(null)
  
  useEffect(() => {
    if (!isOpen) return
    const contact = contacts.find((c: Contact) => String(c.id) === contactId)
    if (!contact) {
      console.error(`No contact found with the provided id: ${contactId}`)
      setContact(null)
      return closeModal()
    }
    setContact(contact)
  }, [isOpen])
  
  const closeModal = () => {
    setSearchParams({})
  }
  
  const handleEditContact = () => {
    contact && setSearchParams({edit: String(contact.id)})
  }
  
  const handleDeleteContact = () => {
    contact && deleteContact(contact.id as number)
  }
  
  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={closeModal}
    >
      {contact && <>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor" className="w-24 h-w-24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <h3 className="mt-1 text-4xl">{contact.firstName} {contact.lastName}</h3>
        <div>Contact id: {contact.id}</div>
        <div>Contact status: {contact.status === Statuses.Active ? 'Active' : 'Inactive'}</div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button onClick={handleEditContact} className="btn btn-info rounded-md">Edit</button>
          <button onClick={handleDeleteContact} className="btn btn-error rounded-md">Delete</button>
        </div>
      </>}
    </Modal>
  )
}

export default connector(ViewContactModal)
