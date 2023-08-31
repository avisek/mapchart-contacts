import { createSlice } from "@reduxjs/toolkit"
import { Statuses } from "../types"
import { Contact } from "../types"

const initialState: Contact[] = [
  // {
  //   id: 0,
  //   firstName: 'Avisek',
  //   lastName: 'Das',
  //   status: Statuses.Active,
  // },
  // {
  //   id: 1,
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   status: Statuses.Inactive,
  // },
]

const contactReducer = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.push(action.payload)
      return state
    },
    updateContact: (state, action) => {
      return state.map(contact => {
        if (contact.id === action.payload.id) {
          return {
            ...contact,
            ...action.payload,
          }
        }
        return contact
      })
    },
    deleteContact: (state, action) => {
      return state.filter(item => item.id !== action.payload)
    },
  },
})

export const {
  addContact,
  deleteContact,
  updateContact,
} = contactReducer.actions
export const reducer = contactReducer.reducer
