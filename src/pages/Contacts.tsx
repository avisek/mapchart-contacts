import EditContactModal from '../components/EditContactModal'
import ContactList from '../components/ContactList'
import { useSearchParams } from 'react-router-dom'
import ViewContactModal from '../components/ViewContactModal'
import { Button } from 'react-daisyui'

const Contacts: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  const createContact = () => {
    setSearchParams({edit: 'new'})
  }
  
  return (
    <>
      <h2>Contacts</h2>
      
      <div className="mt-1">
        <Button
          id="AddContact"
          color="primary"
          onClick={createContact}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
          Create Contact
        </Button>
      </div>
      
      <ContactList />
      
      <ViewContactModal />
      
      <EditContactModal />
    </>
  )
}

export default Contacts
