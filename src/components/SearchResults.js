import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from "lodash";
import {groupByCountry, groupByType, groupBeers} from "../utils/filterFunctions";
import PropTypes from 'prop-types';
import {BeerTile, Loading, Grouping} from "./";
import Grid from "../layout/Grid";
import "./searchResults.scss";

const SEARCH_RESULTS = gql`
    query SearchBeer($page: Int, $searchTerm: String){
        searchBeer(searchTerm: $searchTerm, page: $page){
            beers {
                id
                name
                type {
                    category
                }
                breweries {
                    locations {
                        region
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

const SearchResults = ({searchTerm, setLoading}) => {
    const {loading, error, data, fetchMore, networkStatus} = useQuery(SEARCH_RESULTS,{
        variables: {
            page: 1, 
            searchTerm,
        },
        notifyOnNetworkStatusChange: true
    });
    
    const [beers, setBeers] = useState({beers: []});
    const [filters, setFilter] = useState({byType: false, byLocation:false});
    const [grouping, setGrouping] = useState("NO_GROUPING");

    useEffect(()=> {
        if(data) setBeers(groupBeers(data.searchBeer.beers, grouping));
    }, [grouping, loading])
    {/* 3 means fetching more data !3 applies to first load */}
    if(loading && networkStatus !== 3) {
        setLoading(true);
        return <p>Loading...</p>
    }
    else setLoading(false);
    if (error) return <p>Error :(</p>;
        
    return (
        <div className="search-results">
            <Grouping 
                setBeers={setBeers} 
                setGrouping={setGrouping} 
                grouping={grouping}
            />

            {
                data && grouping === "NO_GROUPING" &&
                <Grid>
                    {data.searchBeer.beers.map((beer)=> <BeerTile key={beer.id} beer={beer}/>)}
                </Grid>
            }

            {
                data && grouping !== "NO_GROUPING" && !Array.isArray(beers) &&
                    Object.keys(beers).map((groupKey)=> (
                        <>
                            <h1>{groupKey}</h1>
                            <Grid>
                                {beers[groupKey].map((beer)=> <BeerTile key={beer.id} beer={beer}/>)}
                            </Grid>
                        </>
                    ))
            }
            <div className="fetch-more-container">
            {/* 3 means fetching more data */}
            {networkStatus === 3? <Loading loading={true} />:
                data.searchBeer.hasMore &&
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
        </div>
    );
}

SearchResults.propTypes = {
    searchTerm: PropTypes.string,
    setLoading: PropTypes.func.isRequired
};

export default SearchResults;
