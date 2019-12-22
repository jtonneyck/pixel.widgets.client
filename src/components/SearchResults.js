import React, {useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import _ from "lodash";

const SEARCH_RESULTS = gql`
    query SearchBeer($page: Int, $searchTerm: String){
        searchBeer(searchTerm: $searchTerm, page: $page){
            beers {
                id
                name
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

    const [filters, setFilter] = useState({byType: false, byLocation:false});
    const [groupings, setGrouping] = useState({byType: false, byLocation: false});

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
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
                data.searchBeer.beers.map((beer)=> <h1 key={beer.id}>{beer.name}</h1>)
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

export default SearchResults;
