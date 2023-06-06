import React, { useRef } from 'react'
import './styles.scss'

function SearchBar(props) {
  const searchHint=props.searchHint;
  const parentFunction=props.parentFunction;

  const searchBarRef=useRef(null);

  return (
    <div className="search-container">
        <input type="text" name="search" placeholder={searchHint} 
          ref={searchBarRef} className="search-input" 
          onChange={()=>{parentFunction(searchBarRef.current.value)}}/>
        <a href="#" className="search-btn">
                <i className="fas fa-search"></i>      
        </a>
    </div>
  )
}

export default SearchBar