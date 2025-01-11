import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { useAuth } from '@/common/store/auth';
import Notification from '@/Modules/Notification';

export default function Add() {
    const [Item, setItem] = useState({
        name: "",
        description: "",
        document: null, // Change this to null for file handling
    });
    const {user} =useAuth()

    const inputHandler = (event) => {
        const { name, value, type, files } = event.target;

        setItem((prevValue) => {
            if (type === "file") {
                // Handle file input
                return {
                    ...prevValue,
                    [name]: files[0], // Set the file object
                };
            } else {
                // Handle other inputs
                return {
                    ...prevValue,
                    [name]: value,
                };
            }
        });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Create FormData object to send data
        const formData = new FormData();
        formData.append("name", Item.name);
        formData.append("email", user.email);
        formData.append("description", Item.description);
        formData.append("document", Item.document);
    
        try {
            const response = await fetch("https://document-management-app-pwr7.onrender.com/api/uploadFile", {
                method: "POST",
                body: formData, // Send FormData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseData = await response.json()
            
            Notification(responseData.message,responseData.type);
        } catch (error) {
            Notification("Failed to fetched ❌","error")
        }
    };


    return (
        <div className="flex items-center justify-center" style={{ height: "85vh" }} >
            <form className="grid w-full max-w-sm items-center gap-1.5 border-2 p-7 rounded" onSubmit={submitHandler} encType="multipart/form-data">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" value={Item.name} placeholder="Enter name of the document" onChange={inputHandler} />
                <br />
                <Label htmlFor="description">Description</Label>
                <Input type="text" id="description" name="description" value={Item.description} placeholder="Enter description of the document" onChange={inputHandler} />
                <br />
                <Label htmlFor="file">File</Label>
                <Input type="file" id="file" name="document" onChange={inputHandler} />
                <br />
                <Button type="submit">Upload</Button>
                <p style={{fontSize:"13px"}}>Click only once on Upload it can take some time!!</p>
            </form>
        </div>
    )
}
