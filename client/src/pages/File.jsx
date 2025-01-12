import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import Loader from '@/common/Loader'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuth } from '@/common/store/auth'
import Notification from '@/Modules/Notification'


export default function File() {
  const { isLoggedIn, user } = useAuth()
  const [userEmail, setUserEmail] = useState({ email: "" })
  const [document, setDocument] = useState([])
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this document?");

    if (!isConfirmed) {
      return; // Exit if the user cancels
    }

    try {
      // Send DELETE request to the server
      const response = await fetch(`https://document-management-app-fyy6.onrender.com/api/upload/deleteDocument/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res_data = await response.json();


      if (response.ok) {
        // Update the local state by filtering out the deleted document
        const updatedDocuments = document.filter((entry) => entry._id !== id);
        setDocument(updatedDocuments);
        Notification(res_data.message, res_data.type)

      } else {
        Notification(res_data.message, res_data.type)
      }
    } catch (error) {
      Notification("Error in delete fetch ❌", "error")
    }
  };


  useEffect(() => {
    if (user && user.email) {
      setUserEmail({ email: user.email });
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userEmail.email) return; // Wait until userEmail is updated
      try {
        const response = await fetch("https://document-management-app-fyy6.onrender.com/api/user/fetchAllDocument", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userEmail),
        });
        const documentData = await response.json();
        setDocument(documentData);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [userEmail]);



  return (
    <>
      {isLoggedIn ?
        <div className='m-5 border mx-auto d-flex flex-column align-items-center' style={{ width: "93%", height: "auto" }
        }>
          <div className='d-flex p-2' style={{ width: "93%", height: "15vh" }}>
            <div className='fs-5 mt-9 ml-8 fw-bold me-auto'>Documents</div>
            <div className='mr-8 mt-9'>
              <Button onClick={() => { navigate('/file/add') }} className="w-0 px-5 ">Add +</Button>
            </div>
          </div>
          <hr width="90%" />
          <div className='d-flex flex-row flex-wrap gap-11 m-11 justify-around'>
            {document.length === 0 ? <h1 style={{ fontSize: "100px" }} className='fw-bold'>No Document!!</h1> : document.map((entries, index) => {
              return <Card className="w-[350px]" key={index} style={{ height: "35rem", padding: "1rem" }}>
                <CardHeader>
                  <CardTitle>{entries.name}</CardTitle>
                  <CardDescription>{entries.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    src={entries.document.url}
                    alt={entries.name}
                    style={{ width: '100%', height: 'auto' }}
                  />
                  {/* <iframe src={entries.document.url} width="100%" height="500px"></iframe> */}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button className="mx-auto" onClick={() => handleDelete(entries._id)}>
                    Delete
                  </Button>
                  <Button className="mx-auto" onClick={() => navigate(`/view/${entries._id}`)}>
                    View
                  </Button>
                </CardFooter>
              </Card>

            })}

          </div>
        </div>
        : <Loader />}

    </>


  )
}
