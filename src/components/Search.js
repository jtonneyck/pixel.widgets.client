import React, {useState, useEffect, Fragment} from "react";
import {useQuery} from "@apollo/react-hooks";
import {SearchResults} from "./";
export default function(props){
    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    
    function handleClick(){
        setSearch(true);
    }

    return (
        <Fragment>
            <input type="text" 
                value={searchTerm} 
                onChange={(e)=>{setSearchTerm(e.target.value)}}
            />
            <button onClick={handleClick}>Search</button>
            {search? <SearchResults searchTerm={searchTerm}/> : ""}
        </Fragment>
    )
}