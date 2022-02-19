import React from "react";
import Category from "./Category";
import Search from "./Search";

const SearchBar = ({
  setSearch,
  bookmarked,
  categories,
  categoryClicked,
  openBookmarked,
  bookmarkedOpen,
}) => {
  console.log(bookmarkedOpen);
  return (
    <div className="option-container">
      <div className="option-col">
        <Search setSearch={setSearch} />
        <div
          className={
            bookmarkedOpen ? "btn-bookmarked-closed" : "btn-bookmarked"
          }
          onClick={openBookmarked}
        >
          {bookmarked.length ? (
            <h5 className="bookmarked-count">{bookmarked.length}</h5>
          ) : (
            <></>
          )}
          <h3>Bookmark</h3>
          <i className="fa fa-bookmark fa-inverse fa-1x"></i>
        </div>
      </div>
      <Category categories={categories} categoryClicked={categoryClicked} />
    </div>
  );
};

export default SearchBar;
