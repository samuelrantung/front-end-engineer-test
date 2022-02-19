import React from "react";
import "../index.css";

const Category = ({ categories, categoryClicked }) => {
  return (
    <div className="btn-category-container">
      {categories.map((category) => (
        <button
          onClick={() => categoryClicked(category.id)}
          key={category.id}
          className="btn-category"
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
