import React, {useState} from 'react';
import PropTypes from 'prop-types';
import "./grouping.scss";

const Grouping = ({setGrouping, grouping, setBeers}) => {

    return (
    <div className="grouping">
        <h1>Group By:</h1>
        <div className="control-group">
            <label for="no-grouping" className="radio">
                <input onChange={()=> {
                    setGrouping("NO_GROUPING");
                }} type="radio" checked={grouping === "NO_GROUPING"} id="no-grouping" name="grouping"/>
                <span>no grouping</span>
            </label>
            <label for="bytype" class="radio">
                <input onChange={()=> {
                    setGrouping("BY_TYPE");
                }} type="radio" id="bytype" checked={grouping === "BY_TYPE"} name="grouping"/>
                <span>type</span>
            </label>
            <label for="bycountry" class="radio">
                <input onChange={()=> {
                    setGrouping("BY_COUNTRY");
                }} type="radio" id="bycountry" Checked={grouping === "BY_COUNTRY"} name="grouping"/>
                <span>country</span>
            </label>
            <label for="byregion" class="radio">
                <input onChange={()=> {
                    setGrouping("BY_REGION");
                }} type="radio" id="byregion" Checked={grouping === "BY_REGION"} name="grouping"/>
                <span>region</span>
            </label>
        </div>
    </div>
    );
}

Grouping.propTypes = {
    setGrouping: PropTypes.func.isRequired,
    grouping: PropTypes.string.isRequired
};

export default Grouping;
