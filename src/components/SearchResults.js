import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from "lodash";

const SEARCH_RESULTS = gql`{
        searchBeer(searchTerm: ""){
            id
            name
            breweries {
                locations{
                    countryIsoCode
                }
            }
        }
    }
`
const SearchResults = ({searchTerm}) => {
    const {loading, error, data} = useQuery(SEARCH_RESULTS);
    const [filters, setFilter] = useState({byType: false, byLocation:false});
    const [groupings, setGrouping] = useState({byType: false, byLocation: false});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    const beersByCountry = _.groupBy(data.searchBeer, (beer)=>beer.breweries[0].locations[0].countryIsoCode);    
    return (
        <div>
            <input onChange={()=> {
                setGrouping({
                    ...groupings,
                    byLocation: !groupings.byLocation
                })
            }} type="checkbox" id="location" name="location"/>
            <label for="location">group by location</label>

            {data && !groupings.byLocation &&
                data.searchBeer.map((beer)=> <h1>{beer.name}</h1>)
            }
            {
            data && groupings.byLocation &&
                Object.keys(
                    beersByCountry
                )
                .map((countryIso)=> (
                    <>
                    <h1>{countryIso}</h1>
                    <ul>
                        {beersByCountry[countryIso].map((beer)=> 
                            <p>{beer.name}</p>
                        )}
                    </ul>
                    </>
                ))
            }
        </div>
    );
}

export default SearchResults;
