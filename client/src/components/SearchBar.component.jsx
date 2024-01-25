import React from "react";
//import { Input } from "antd";
//const Search = Input.Search;
import "./Styles/SearchBar.css";
//import RestaurantList from "./RestaurantCard.component";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ handleSearch, searchData }) => {
  //  const handleSearch = (e) => {
  //   //console.log(e.target.value);
  //   let searchData = e.target.value;
  //   let arr = [];
  //   if(searchData){
  //     //arr = avai
  //   }

  //   }
  const navigate = useNavigate();

  const handleSelectRestaurant = async (restaurantId) => {
    console.log(restaurantId);
    try {
      navigate(`/restaurant/${restaurantId}`);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(searchData.length);
  return (
    <div className="container">
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search for Bento reservations.."
          onChange={handleSearch}
        />
        {searchData.length > 0 && (
          <div className="resultBox">
            {searchData.map((data) => (
              <li key={data.id} style={{display:"flex", alignItems:"center"}}
              onClick={() => { handleSelectRestaurant(data.id);}}
            >
                <img className="search-result-img" src={data.image} />
                <span style={{ marginLeft: "1rem" }}>{data.name}</span>
              </li>
            ))}
          </div>
        )}{" "}
        <div className="icon">
          <img
            className="fas fa-search"
            src="https://res.cloudinary.com/dwrwwcvfb/image/upload/v1705826882/icons8-search-100_dlrokn.png"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
