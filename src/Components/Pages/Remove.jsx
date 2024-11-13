import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react'; // Import buttons from your UI library
import { Carousel } from 'primereact/carousel';
import './Remove.css'; // Optional: Include custom CSS for styling
import {Card, CardBody, Image } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

const Remove = () => {
    const [petData, setPetData] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/rem');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setPetData(data);
            } catch (error) {
                console.error('Error fetching pet data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, []);



    const handleDelete = (user) => {
        console.log('Delete button clicked for:', user);
        fetch('http://localhost:3001/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email_id: user.email_id,
                name: user.name,
                mob_no: user.mob_no,
                ani_name: user.ani_name,
                ani_age: user.ani_age,
                ani_des: user.ani_des,
                ani_type: user.ani_type
            }) // Send necessary fields to the delete API
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete entry');
            }
            return response.json();
        })
        .then(data => {
            console.log('Delete response:', data);
            // Remove the deleted user from state to update UI
            setPetData(petData.filter(p => p.email_id !== user.email_id)); // Use a unique attribute for filtering
        })
        .catch(error => {
            console.error('Error deleting data:', error);
        });
    };
    
    
    

    const petTemplate = (user) => {
        return (
            <div className="carousel-item">
                <div className="mb-3">
                    <img src={user.ani_pfp} alt={user.ani_name} />
                </div>
                <div>
                    <h4 className="mb-1">Name of Owner - {user.name}</h4>
                    <h6 className="mt-0 mb-3 email">Email ID of owner - {user.email_id}</h6>
                    <h6 className="mt-0 mb-3">Contact Number of owner - {user.mob_no}</h6>
                    <h6 className="mt-0 mb-3">Animal Type - {user.ani_type}</h6>
                    <h6 className="mt-0 mb-3">Animal Name - {user.ani_name}</h6>
                    <h6 className="mt-0 mb-3">Animal Age - {user.ani_age}</h6>
                    <h6 className="mt-0 mb-3">Animal description - {user.ani_des}</h6>

                    {/* Add buttons here */}
                    <div className="button-group">
                        <Button onPress={() => handleDelete(user)} color="error" auto>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
             <div>
        <Card className="header">
          <h1 className='title-container'>petStore.</h1>
        </Card>
      </div>
            <div>
                <Card className="card" isPressable disableAnimation disableRipple onPress={() => { navigate('/Admin') }}>
                    <CardBody>
                        <Image
                            className="card-image"
                            src="https://www.clker.com/cliparts/l/a/V/x/F/r/house-icon-dark-green-md.png"
                            alt="House icon"
                        />
                    </CardBody>
                </Card>
            </div>
            <div className="carousel-content">
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <Carousel
                        value={petData}
                        itemTemplate={petTemplate} // Use petTemplate for each item
                        orientation="vertical"
                        verticalViewPortHeight="500px"
                    />
                )}
            </div>
        </div>
    );
};

export default Remove;
