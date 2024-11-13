import React, { useEffect, useState } from 'react';
import { Input, Card, CardBody, Image, Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState(""); // For storing password
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            // Sending a POST request with both email and password in the body
            const reqData = await fetch("http://localhost:3001/api/autho", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, pwd }) // Send both email and password
            });

            if (!reqData.ok) {
                throw new Error(`Error: ${reqData.statusText}`);
            }

            const resData = await reqData.json();
            console.log('Fetched User Data:', resData);

            if (resData.length > 0) {
                navigate('/Admin'); // Navigate if user found and password matches
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <div>
        <Card className="header">
          <h1 className='title-container'>petStore.</h1>
        </Card>
      </div>
            <div>
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
            </div>
            <div>
                <div className="container">
                    <div className="custom-input">
                        <Input
                            isRequired
                            type="password" // Password input
                            label="Password"
                            labelPlacement="outside-left"
                            placeholder="Enter your password"
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Button className="but" disableRipple onClick={handleSubmit}>
                    Submit
                </Button>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error if any */}
            </div>
        </div>
    );
}
