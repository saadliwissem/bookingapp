import "./FeaturedProperties.css"
import React from 'react'
import useFetch from "../../hooks/useFetch";

export const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels?freatured=true&limit=4");
  return (
    
    
    <div className="fp">
    {loading ? "loading please wait":<>
    {data.map(item=>(

      <div className="fpItem" key={item._id}>
        <img
          src={item.photos[0]}
          alt=""
          className="fpImg"
          />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting from {item.cheapestPrice}£</span>
          {item.rating && 
        <div className="fpRating">
          <button>{item.rating}</button>
          <span>Excellent</span>
        </div>
}
      </div>
          ))}
      </>}
    </div>
    
  )
}
