import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from "lodash";
import {groupByCountry} from "../utils/filterFunctions";
import PropTypes from 'prop-types';
import {BeerTile} from "./";

const SEARCH_RESULTS = gql`
    query SearchBeer($page: Int, $searchTerm: String){
        searchBeer(searchTerm: $searchTerm, page: $page){
            beers {
                id
                name,
                breweries {
                    locations {
                        country {
                            isoCode
                            name
                        }
                    }
                },
                images {
                    icon
                    medium
                    large
                }
            }
            hasMore
            page

        }
    }
`

const SearchResults = ({searchTerm}) => {
    const {loading, error, data, fetchMore} = useQuery(SEARCH_RESULTS,{
        variables: {
            page: 1, 
            searchTerm
        }
    });
    const [beers, setBeers] = useState({beers: data});
    const [filters, setFilter] = useState({byType: false, byLocation:false});
    const [groupings, setGrouping] = useState({byType: false, byLocation: false});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    debugger
    return (
        <div>
            <input onChange={()=> {
                setGrouping({
                    ...groupings,
                    byLocation: !groupings.byLocation
                });

                setBeers(groupByCountry(data.searchBeer.beers));
            }} type="checkbox" id="location" name="location"/>

            <label for="location">group by location</label>

            {
                data && !groupings.byLocation &&
                    data.searchBeer.beers.map((beer)=> <h1 key={beer.id}>{beer.name}</h1>)
            }

            {
                data && groupings.byLocation && Object.keys(beers).map((countryKey)=> (
                <>    
                    <h1>{countryKey}</h1>
                    <ul>
                        {beers[countryKey].map((beer)=> <BeerTile key={beer.id} beer={beer}/>)}
                    </ul>
                </>
                ))
            }

            {data.searchBeer.hasMore &&
                <button onClick={()=> {
                    fetchMore({
                        variables: {
                        page: data.searchBeer.page + 1
                        },
                        updateQuery: (prev, {fetchMoreResult, ...rest})=> {
                        if(!fetchMoreResult) return prev;
                        let mergedBeers = [...prev.searchBeer.beers, ...fetchMoreResult.searchBeer.beers];
                        return {
                            searchBeer: {
                                ...fetchMoreResult.searchBeer,
                                beers: mergedBeers
                            }
                        }
                        }
                    })}
                    }
                >
                Load more
                </button>
            }
        </div>
    );
}

SearchResults.propTypes = {
    searchTerm: PropTypes.string
};

export default SearchResults;
