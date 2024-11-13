// PetCard.jsx
import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import PropTypes from 'prop-types';

const PetCard = ({ user }) => {
    return (
        <Card className="pet-card">
            <CardBody className="card-body">
                <img src={user.ani_pfp} alt={user.ani_name} className="pet-image" />
                <h4 className="card-title">{user.ani_name}</h4> {/* Animal Name - largest font */}
                <h5 className="card-type">{user.ani_type}</h5> {/* Animal Type - slightly smaller */}
                <div className="card-details"> {/* Details container */}
                    <h6 className="mt-0 mb-3 email">Email ID of owner - {user.email_id}</h6>
                    <h6 className="mt-0 mb-3">Contact Number of owner - {user.mob_no}</h6>
                    <h6 className="mt-0 mb-3">Animal Age - {user.ani_age}</h6>
                    <h6 className="mt-0 mb-3">Animal description - {user.ani_des}</h6>
                </div>
            </CardBody>
        </Card>
    );
};

// Type-checking with PropTypes
PetCard.propTypes = {
    user: PropTypes.object.isRequired,
};

export default PetCard;
