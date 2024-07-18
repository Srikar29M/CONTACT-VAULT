import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';
import Spinner from '../components/spinner';
import {Modal, ModalDialog, ModalHeader} from "react-bootstrap"


const AllContacts = () => {
    const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
 
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    setLoading(true)
    const fetchContacts = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/mycontacts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
          setLoading(false)
          console.log(result);
        } else {
          console.log(result);
          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching contacts:", err);
      }
    };

    fetchContacts();

   
  }, []);

  const deleteContact = async (id)=>{
    if(window.confirm("Are u sure you want to delete this contact ?")){
    try {
        const res = await fetch(`http://localhost:4000/api/delete/${id}` ,{
            method:"DELETE",
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`,


            }
        });
        const result = await res.json();
        if(!result.error){
          setContacts(result.myContacts)
          toast.success("Deleted Contact")
          setShowModal(false);

        }else{

          toast.error(result.error)

        }
        
    } catch (err) {
        console.log(err)
        
    }
  }
  }
 
  
  const handleSearchSubmit = (event) =>{

      event.preventDefault();
console.log("hello")
       const newSearchUser = contacts.filter((contact) => 
        contact.name.toLowerCase().includes(searchInput.toLowerCase()));
       console.log(newSearchUser)
       setContacts(newSearchUser)

  

       
  }
  
  return (
  <>    
    <div >
      <a href="/mycontacts" className='btn btn-danger my-2'>RELOAD CONTACTS</a>
    <h1 >Your Contacts</h1>
    <hr className='my-4' />
     {loading?(<Spinner splash='Loading Contacts...'/>
     ): contacts.length === 0 ? (<h3>No Contacts Created Yet</h3>):( 
     <>
     <form onSubmit={handleSearchSubmit}>     <input type="text" name='searchInput' id='searchInput' className= "search"placeholder='Search Contacts'
             value={searchInput}
             onChange={(e)=>setSearchInput(e.target.value)}
             />
             <input type="submit" value="Search"  className='btn btn-info sub '/>
             </form>
 
      <h5>Your Total Contacts: <strong>{contacts.length}</strong></h5>
<div  className='table-responsive'>
    <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr   key={contact._id} 
                       onClick={()=>{
                      setModalData({});
                      setModalData(contact);
                      setShowModal(true)}}>
                      
                  
                        <th scope="row">{contact.name}</th>
                        <td>{contact.address}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>
                </>

                  )}
                
  </div>

            <Modal show= {showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalData.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p><strong>Address:</strong>{modalData.address}</p>
                    <p><strong>Email:</strong>{modalData.email}</p>
                    <p><strong>Phone Number:</strong>{modalData.phone}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Link to={`/edit/${modalData._id}`} className='btn btn-info'  >Edit</Link>
                    <div className='button-group'>
                    <button className='btn btn-danger' onClick={()=>deleteContact(modalData._id)} >Delete</button>
                    <button className='btn btn-warning' onClick={()=>setShowModal(false)} >Close</button>
                    </div>
                </Modal.Footer>
            </Modal>
  </>
  
  )
}


export default AllContacts