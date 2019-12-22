import _ from "lodash";

export const groupByRegion = (beers)=> {
}

export const groupByCountry = (beers)=> {
    return _.groupBy(beers, (beer)=>beer.breweries[0].locations[0].country.name);
}

// export const groupByCoordinate = (beers)