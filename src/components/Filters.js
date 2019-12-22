import React from 'react';
import PropTypes from 'prop-types';
import "./filters.scss";

const Filters = ({filters:{countries, regions}}) => {
    debugger
    return (
        <div className="filters">
            <div class="container">
                <ul class="ks-cboxtags">
                    <li>
                    <input type="checkbox" id="checkboxOne" value="Rainbow Dash"/>
                    <label for="checkboxOne">Rainbow Dash</label>
                    </li>
                </ul>
            </div>
            <div>
                <h1>Country Filters</h1>
                <div class="container">
                    <ul class="ks-cboxtags">
                        {countries.map((country)=> (
                            <li>
                                <input type="checkbox" id={`${country.name}-filter`} value={country.name} />
                                <label for={`${country.name}-filter`}>{country.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <h1>Region Filters</h1>
                <div class="container">
                    <ul class="ks-cboxtags">
                        {regions.map((region)=> (
                            <li>
                                <input type="checkbox" id={`${region}-filter`} value={region}/>
                                <label for={`${region}-filter`}>{region}</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Filters;

/* filter by types not yet implemented */
Filters.propTypes = {
    filters: PropTypes.shape({
        countries: PropTypes.arrayOf(PropTypes.shape({
            isoCode: PropTypes.string,
            name: PropTypes.string.isRequired
        })).isRequired,
        regions: PropTypes.arrayOf(PropTypes.string).isRequired
    })
}