import { Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem"; // Import the CardItem component

export default function App() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Card className="header">
          <h1 className='title-container'>petStore.</h1>
        </Card>
      </div>
      <div>
        <Card
          className="card"
          isPressable
          disableAnimation
          disableRipple
          onPress={() => {
            navigate("/");
          }}
        >
          <CardBody>
            <Image
              className="card-image"
              src="https://www.clker.com/cliparts/l/a/V/x/F/r/house-icon-dark-green-md.png"
              alt="House icon"
            />
          </CardBody>
        </Card>
      </div>
      <div>
        {/* Using CardItem for the Verify card */}
        <CardItem 
          title="Verify" 
          onClick={() => navigate("/Verify")} 
        />
        <div className="down">
          {/* Using CardItem for the Remove card */}
          <CardItem 
            title="Remove" 
            onClick={() => navigate("/Remove")} 
          />
        </div>
      </div>
    </div>
  );
}
