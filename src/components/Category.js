import React from "react";
import "../index.css";

const Category = ({ categories, categoryClicked }) => {
  return (
    <div className="button-group p-0">
      {categories.map((category) => (
        <button
          onClick={() => categoryClicked(category.id)}
          key={category.id}
          className="btn btn-primary m-1"
        >
          {category.name}
        </button>
        // <li key={category.id} className="list-group-item">
        //   {category.name}
        // </li>
      ))}
    </div>
  );
};

export default Category;
