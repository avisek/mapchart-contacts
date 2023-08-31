import React, { useState, useEffect } from 'react'
import { ConnectedProps, connect } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from '../redux/store'
import { deleteContact } from "../redux/reducer"
import { useSearchParams } from 'react-router-dom'
import Modal from './Modal'
import { Contact, IExtraDispatchArguments } from '../types'

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
        <h2>{contact.firstName} {contact.lastName}</h2>
        <div>Contact id: {contact.id}</div>
        <div>
          <button onClick={handleEditContact} className="btn btn-info">Edit</button>
          <button onClick={handleDeleteContact} className="btn btn-error">Delete</button>
        </div>
      </>}
    </Modal>
  )
}

export default connector(ViewContactModal)
