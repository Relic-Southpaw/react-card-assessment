import React, { useState } from 'react';

const Card = ({ name, image }) => {
    return <img
        src={image}
        alt={name}
    />
}

export default Card;