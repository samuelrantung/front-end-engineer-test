import React from "react";
import "../index.css";

const Books = ({ books, search, bookmark, categories }) => {
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
          return (
            <div className="card-container" key={book.id}>
              <img src={book.cover_url} className="book-cover" alt="..."></img>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">{book.description}</p>
                <a
                  onClick={() => bookmark(book)}
                  href="#"
                  className="btn btn-primary"
                >
                  Bookmark now
                </a>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Books;
