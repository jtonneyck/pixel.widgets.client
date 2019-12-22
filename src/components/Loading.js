import React from 'react';
import "./loading.scss";
import PropTypes from 'prop-types';

const Loading = ({loading}) => {
    return (
        <span className="loading">
            <img src="/beer-loading-no-bg.png" className={loading && "is-loading"}/>
        </span>
    );
}

export default Loading;

Loading.propTypes = {
    loading: PropTypes.bool.isRequired
};