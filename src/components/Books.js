import React, { useState } from "react";
import "../index.css";

const Books = ({ books, search, bookmarked, bookmark, categories }) => {
  return (
    <div className="list-group">
      {books
        .filter((val) => {
          if (search === "") {
            return val;
          } else if (val.title.toLowerCase().includes(search.toLowerCase())) {
            return val;
          }
          return null;
        })
        .map((book) => {
          const category = categories.find(
            (obj) => obj.id === book.category_id
          );
          let check;
          const index = bookmarked.findIndex(({ id }) => id === book.id);
          if (index === -1) {
            check = index;
          }
          return (
            <div className="card-grid" key={book.id}>
              <img src={book.cover_url} className="book-cover" alt="..."></img>
              <div className="card-body">
                <div className="card-title-container">
                  <h5 className="card-title">{book.title}</h5>
                  <h5 className="card-category">{category.name}</h5>
                </div>
                <p className="card-text">{book.description}</p>
              </div>
              {check ? (
                <button onClick={() => bookmark(book)} className="btn-bookmark">
                  <h5 className="btn-text">Bookmark Now</h5>
                </button>
              ) : (
                <button
                  onClick={() => bookmark(book)}
                  className="btn-bookmark-del"
                >
                  <h5 className="btn-text">Remove from Bookmark</h5>
                </button>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Books;
