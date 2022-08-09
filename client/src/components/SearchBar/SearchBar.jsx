import React from "react";
import "./SearchBar.css";

function SearchBar({ placeholder }) {
    return(
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder}/>
                <div className="joinIcon">
                    JOIN
                </div>
            </div>
        </div>
    )
}

export default SearchBar