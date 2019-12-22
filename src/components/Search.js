import React, {useState, useEffect, Fragment} from "react";
import {useQuery} from "@apollo/react-hooks";
import {SearchResults, Loading} from "./";
import "./search.scss";

export default function(){

    const [searchTerm, setSearchTerm] = useState("");
    const [search, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    
    function handleClick(){
        setSearch(true);
    }

    return (
        <Fragment>
            <div className="search">
                <div className="title">
                    <h1>BEER APP </h1>
                    <Loading loading={loading}/>
                </div>
                <input type="text" 
                    value={searchTerm} 
                    onChange={(e)=>{setSearchTerm(e.target.value)}}
                    placeholder="beer name"
                />
                <button onClick={handleClick}>Search</button>
            </div>
            {search? <SearchResults setLoading={setLoading} searchTerm={searchTerm}/> : ""}
        </Fragment>
    )
}