import React from 'react';
import PropTypes from 'prop-types';
import "./beerTile.scss";

const BeerTile = ({beer: {images, name}, ...props}) => {
    return (
        <div className="beer-tile">
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
