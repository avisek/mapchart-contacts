import React, { useState, useEffect, useRef } from 'react'
import { ConnectedProps, connect } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { RootState } from '../redux/store'
import { addContact, updateContact } from "../redux/reducer"
import { useSearchParams } from 'react-router-dom'
import Modal from './Modal'
import { Contact, Statuses, IExtraDispatchArguments } from '../types'

const mapStateToProps = (state: RootState) => {
  return {
    contacts: state,
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, IExtraDispatchArguments, AnyAction>) => {
  return {
    addContact: (obj: Contact) => dispatch(addContact(obj)),
    updateContact: (obj: Contact) => dispatch(updateContact(obj)),
  }
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

interface Props extends PropsFromRedux {
  contacts: Contact[]
}

const initialFormState: Contact = {
  firstName: '',
  lastName: '',
  status: Statuses.Active,
}

const EditContactModal: React.FC<Props> = props => {
  
  const [searchParams, setSearchParams] = useSearchParams()
  const contactId = searchParams.get('edit')
  const isOpen = contactId !== null
  
  const focusInputRef = useRef<HTMLInputElement | null>(null)
  const [formState, setFormState] = useState<Contact>(
    initialFormState
  )
  
  useEffect(() => {
    if (!isOpen && !focusInputRef.current) return
    if (contactId === 'new' || contactId === null) {
      setFormState(initialFormState)
    } else {
      const contact = props.contacts.find((c: Contact) => String(c.id) === contactId)
      if (!contact) {
        console.error(`No contact found with the provided id: ${contactId}`)
        return closeModal()
      }
      setFormState(contact)
    }
    const timerId = setTimeout(() => {
      focusInputRef.current!.focus()
    }, 0)
    return () => clearTimeout(timerId)
  }, [isOpen])
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target
    setFormState((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }
  
  const getNewContactId = (contacts: Contact[]): number => {
    let newId = 0
    contacts.forEach(contact => {
      if (newId === contact.id) newId++
    })
    return newId
  }
  
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    if ('id' in formState) {
      props.updateContact(formState)
    } else {
      props.addContact({
        id: getNewContactId(props.contacts),
        ...formState
      })
    }
    closeModal()
  }
  
  const closeModal = () => {
    setSearchParams({})
  }
  
  return (
    <Modal
      hasCloseBtn={true}
      isOpen={isOpen}
      onClose={closeModal}
    >
      <h2>{'id' in formState ? 'Edit' : 'Create'} Contact</h2>
      <form
        onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="firstName">First Name</label>
          <input
            ref={focusInputRef}
            name="firstName"
            id="firstName"
            type="text"
            value={formState.firstName}
            onChange={handleChange}
            autoComplete="given-name"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            id="lastName"
            type="text"
            value={formState.lastName}
            onChange={handleChange}
            autoComplete="family-name"
            required
          />
        </div>
        <div className="form-row">
          <label>Status</label>
          <div>
            <div>
              <input
                type="radio"
                id="statusActive"
                name="status"
                value={Statuses.Active}
                checked={formState.status === Statuses.Active}
                onChange={handleChange}
                required
              />
              <label htmlFor="statusActive">Active</label>
            </div>
            <div>
              <input
                type="radio"
                id="statusInactive"
                name="status"
                value={Statuses.Inactive}
                checked={formState.status === Statuses.Inactive}
                onChange={handleChange}
              />
              <label htmlFor="statusInactive">Inactive</label>
            </div>
          </div>
        </div>
        <div className="form-row">
          <button type="submit" className='btn btn-primary'>Submit</button>
        </div>
      </form>
    </Modal>
  )
}

export default connector(EditContactModal)
