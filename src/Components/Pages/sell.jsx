import { Input, Button, Card, CardBody, Image } from "@nextui-org/react";
import './sell.css';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase storage
import { storage } from './firebaseconfig'; // Ensure Firebase is initialized in a separate config file
import { FileUpload } from 'primereact/fileupload'; // Import the FileUpload component from PrimeReact

export default function App() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [dname, setDname] = useState("");
    const [d_age, setD_age] = useState("");
    const [desc, setDesc] = useState("");
    const [pic, setPic] = useState("");
    const [ani_type, setAni_type] = useState("");
     // Will hold the uploaded image URL
    const [uploadStatus, setUploadStatus] = useState(""); // To show the upload status

    // Handler for file upload to Firebase
    const onUpload = async (event) => {
        const file = event.files[0]; // Get the file

        if (!file) {
            setUploadStatus('No file selected');
            return;
        }

        const storageRef = ref(storage, `uploads/${file.name}`);
        setUploadStatus('Uploading...');

        try {
            // Upload file to Firebase
            await uploadBytes(storageRef, file);
            
            // Get the download URL
            const downloadURL = await getDownloadURL(storageRef);
            setPic(downloadURL); // Store the URL in state
            setUploadStatus('Upload successful!');
            console.log('Uploaded file URL:', downloadURL);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Error uploading file: ' + error.message);
        }
    };

    // Submit form data
    const handleSubmit = async () => {
        if (!pic) {
            alert("Please wait for the image upload to complete.");
            return;
        }

        const formData = { email, name, number, dname, d_age, desc, pic, ani_type }; // Include pic in the data
        
        console.log('Form Data Before Submit:', formData); // Log the form data for debugging
        
        try {
            const response = await fetch('http://localhost:3001/api/submit', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), 
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form');
        }
        navigate('/'); // Navigate to home page after submission
    };

    return (
        <div>
            <div>
            <div>
        <Card className="header">
          <h1 className='title-container'>petStore.</h1>
        </Card>
      </div>
                
            </div>
            <div className="container">
                <div className="custom-input">
                    <Input 
                        isRequired
                        type="email" 
                        label="Email" 
                        labelPlacement="outside-left"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>
            <div className="container">
                <div className="custom-input">
                    <Input 
                        isRequired 
                        type="name" 
                        label="Name" 
                        labelPlacement="outside-left"
                        placeholder="Enter your full name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            </div>
            <div className="container">
                <div className="custom-input">
                    <Input 
                        isRequired 
                        type="tel" 
                        label="Number" 
                        labelPlacement="outside-left"
                        placeholder="Enter your mobile number" 
                        value={number}
                        onChange={(e) => setNumber(e.target.value)} 
                    />
                </div>
            </div>
            <div className="container">
                <div className="custom-input">
                    <Input 
                        isRequired 
                        type="name" 
                        label="Animal Type" 
                        labelPlacement="outside-left"
                        placeholder="Enter animal type" 
                        value={ani_type}
                        onChange={(e) => setAni_type(e.target.value)} 
                    />
                </div>
            </div>
            <div className="container">
                <div className="custom-input">
                    <Input 
                        isRequired 
                        type="name" 
                        label="Animal Name" 
                        labelPlacement="outside-left"
                        placeholder="Enter Animal's name" 
                        value={dname}
                        onChange={(e) => setDname(e.target.value)} 
                    />
                </div>
            </div>
            <div className="container">
                <div className="custom-input">
                    <Input 
                        isRequired 
                        type="number" 
                        label="Animal Age" 
                        labelPlacement="outside-left"
                        placeholder="Enter Animal's age" 
                        value={d_age}
                        onChange={(e) => setD_age(e.target.value)} 
                    />
                </div>
            </div>
            <div className="container">
                <div className="custom-input">
                    <Input 
                        isRequired 
                        type="name" 
                        label="Animal desc" 
                        labelPlacement="outside-left"
                        placeholder="Enter Animal's description" 
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)} 
                    />
                </div>
            </div>

            <div className="container">
                {/* File Upload using PrimeReact FileUpload component */}
                <FileUpload 
                    name="demo[]" 
                    accept="image/*" 
                    maxFileSize={1000000} // 1MB file size limit
                    customUpload
                    uploadHandler={onUpload} // Use onUpload as the upload handler
                    emptyTemplate={<p className="m-0">Drag and drop a pic of your pet here.</p>}
                />
                <p>{uploadStatus}</p> {/* Display the upload status */}
            </div>
            
            <div>
                <Button className="but" disableRipple onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
}
