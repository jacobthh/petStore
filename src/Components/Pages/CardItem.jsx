import { Card, CardBody } from "@nextui-org/react";
import React from 'react';
import PropTypes from 'prop-types';

function CardItem({ title, onClick }) {
  return (
    <Card className="cccontainer card-item" isPressable disableRipple onPress={onClick}>
      <CardBody className="card-body">
        <h3 className="card-title">{title}</h3>
      </CardBody>
    </Card>
  );
}

// Type-checking with PropTypes
CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CardItem;
