import React from "react";
import ReactDOM from "react-dom";

const Overlay = ({ setOpenBook, openBook, bookParams, categories }) => {
  const category = categories.find((obj) => obj.id === bookParams.category_id);
  return (
    <>
      <div className="overlay" onClick={() => setOpenBook(!openBook)}></div>
      <div className="popup-dialog">
        <div
          className="popup-dialog-close"
          onClick={() => setOpenBook(!openBook)}
        >
          <i className="fa fa-close fa-2x"></i>
        </div>
        <div className="popup-dialog-column1">
          <img
            className="popup-dialog-img"
            src={bookParams.cover_url}
            alt="book-cover"
          ></img>
          <button className="popup-dialog-bookmark-btn">
            <h4>Bookmark Now</h4>
          </button>
        </div>
        <div className="popup-dialog-column2">
          <h1>{bookParams.title}</h1>
          <h3>{category.name}</h3>
          <h5>{bookParams.description}</h5>
          {bookParams.sections.map((section, i) => {
            return (
              <div key={i}>
                <h5>{section.title}</h5>
                <p>{section.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Overlay;
