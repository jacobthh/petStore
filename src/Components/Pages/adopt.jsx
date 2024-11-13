// Adopt.jsx
import React, { useEffect, useState } from 'react';
import { Card, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import './adopt.css';
import { useNavigate } from "react-router-dom";
import PetCard from './PetCard'; // Import the PetCard component
import { setFnum, setCurrentValue } from './sharedState';

const Adopt = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedKeys, setSelectedKeys] = useState(new Set(["Filter"]));
    const selectedValue = Array.from(selectedKeys).join(", ").replaceAll("_", " ");
    const [currentValue, setCurrent] = useState(1);

    const keyToNumberMap = {
        all: 1,
        dog: 2,
        cat: 3,
        rabbit: 4,
        snake: 5,
        spider: 6,
        hamster: 7,
        guinea_pig: 8,
    };

    const fetchUserData = async (value) => {
        try {
            const reqData = await fetch(`http://localhost:3001/api/users`);
            if (!reqData.ok) {
                throw new Error('Network response was not ok');
            }
            const resData = await reqData.json();
            setUserData(resData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchUserData(currentValue);
    }, [currentValue]);

    const handleSelectionChange = async (keys) => {
        const selectedKey = Array.from(keys).join(""); 
        setSelectedKeys(keys);
        const value = keyToNumberMap[selectedKey] || 1;
        setCurrent(value); // Update local state
        setCurrentValue(value); // Update shared state
        setFnum(value); // Update global fnum

        // Send the filter value to the backend
        try {
            const response = await fetch('http://localhost:3001/api/set-filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ filterValue: value }),
            });

            if (!response.ok) {
                throw new Error('Failed to update filter value on server');
            }
            
            const data = await response.json();
            console.log(data.message); // Log success message or handle accordingly
        } catch (error) {
            console.error('Error updating filter value on server:', error);
        }
    };

    return (
        <div>
            
            <div>
                <Card className="header">
                    <h1 className='title-container'>petStore.</h1>
                </Card>
            </div>
            <div className='filter'>
                <Dropdown backdrop='blur'>
                    <DropdownTrigger>
                        <Button disableRipple className="capitalize">
                            {selectedValue}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Single selection example"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={handleSelectionChange}
                        className="dropdown-menu"
                    >
                        <DropdownItem key="all">All</DropdownItem>
                        <DropdownItem key="dog">Dog</DropdownItem>
                        <DropdownItem key="cat">Cat</DropdownItem>
                        <DropdownItem key="rabbit">Rabbit</DropdownItem>
                        <DropdownItem key="snake">Snake</DropdownItem>
                        <DropdownItem key="spider">Spider</DropdownItem>
                        <DropdownItem key="hamster">Hamster</DropdownItem>
                        <DropdownItem key="guinea_pig">Guinea pig</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="cards-container">
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    userData.map((user) => (
                        <PetCard key={user.id} user={user} /> // Render each PetCard with user data
                    ))
                )}
            </div>
            
        </div>
    );
};

export default Adopt;
