import _ from "lodash";

export const groupBeers = (beers, grouping)=> {
    switch(grouping) {
        case("NO_GROUPING"):
            return beers;
        case("BY_COUNTRY"):
            return groupByCountry(beers);
        case("BY_REGION"):
            return groupByRegion(beers);
        case("BY_TYPE"):
            return groupByType(beers);
        default:
            return beers;
    }
}

export const groupByCountry = (beers)=> {
    /* duplicate all beers per country name */
    let locations = _
    .chain(beers)
    .flatMap(beer=> 
        beer.breweries.map(brewery=> ({
            ...beer,
            brewery
            })
        )
    )
    .flatMap(beer=> {
        return _.chain(beer.brewery.locations)
            .map(location=>({
                ...beer,
                brewery: {
                    ...beer.brewery,
                    location
                }
            }))
            .uniqWith((beer)=> beer.brewery.location.country.name)
            .value();
    })
    .value()
    return _.groupBy(locations,(beer)=>beer.brewery.location.country.name);
}

export const groupByRegion = (beers)=> {
    /* duplicate all beers per region name */
    let locations = _
    .chain(beers)
    .flatMap(beer=> 
        beer.breweries.map(brewery=> ({
            ...beer,
            brewery
            })
        )
    )
    .flatMap(beer=> {
        return _.chain(beer.brewery.locations)
            .map(location=>({
                ...beer,
                brewery: {
                    ...beer.brewery,
                    location
                }
            }))
            .uniqWith((beer)=> beer.brewery.location.country.region)
            .value();
    })
    .value()
    debugger
    /* now group by region */
    return _.groupBy(locations,(beer)=>beer.brewery.location.region);
}

export const groupByType = (beers)=> {
    return _.groupBy(beers, (beer)=>beer.type.category);
}

// export const groupByCoordinate = (beers)