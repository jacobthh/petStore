import React from 'react';
import { useNavigate } from "react-router-dom";
import CardItem from './CardItem';  // import the CardItem component
import './Home.css';
import { Card, CardBody, Image} from "@nextui-org/react";

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
        <div className="image-container">
          <img 
            className='pic' 
            src='https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1xw:0.74975xh;center,top' 
            alt="Dog Puppy" 
          />
        </div>
        
        <CardItem
          title="Put up for adoption"
          onClick={() => navigate('/sell')}
        />

        <div className="down">
          <CardItem
            title="Adopt!"
            onClick={() => navigate('/adopt')}
          />
        </div>
      </div>

      <Card className="login" isPressable disableAnimation disableRipple onPress={() => navigate('/Login')}>
        <CardBody>
          <Image
            className="card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Tools_icon.png?20220918105910"
            alt="Login"
          />
        </CardBody>
      </Card>
    </div>
  );
}
