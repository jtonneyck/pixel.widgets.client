import React from 'react';
import PropTypes from 'prop-types';

const BeerTile = ({beer: {images, name}, ...props}) => {
    debugger
    return (
        <div>
            <h1>{name}</h1>
            <img src={images.medium} alt=""/>
        </div>
    );
}

BeerTile.propTypes = {
    name: PropTypes.string,
    images: PropTypes.shape({
        icon: PropTypes.string,
        medium: PropTypes.string,
        large: PropTypes.string
    })    
};

export default BeerTile;
