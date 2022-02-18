import React from "react";

const Search = ({ setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search.."
      onChange={(e) => setSearch(e.target.value)}
    ></input>
  );
};

export default Search;
