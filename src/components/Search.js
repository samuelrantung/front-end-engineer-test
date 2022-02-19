import React from "react";

const Search = ({ setSearch }) => {
  return (
    <div className="col">
      <input
        className="textbox"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search book..."
      ></input>
      <span className="focus-bg"></span>
    </div>
  );
};

export default Search;
