import axios from "axios";
import React, { useState, useEffect } from "react";
import Books from "./components/Books";
import Category from "./components/Category";
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import useLocalStorage from "./hooks/localStorage";
import "./index.css";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [booksPerPage, setBooksPerPage] = useState(10);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(1);
  const [search, setSearch] = useState("");
  //   const [bookmarked, setBookmarked] = useLocalStorage('bookmarked',[]);
  const [bookmarked, setBookmarked] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const booksRes = await axios.get(
        `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${currentCategory}&page=${currentPage}&size=${booksPerPage}`
      );
      const categoriesRes = await axios.get(
        "https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories"
      );
      setBooks(booksRes.data);
      setCategories(categoriesRes.data);
    };
    fetch();

    if (categories.length !== 0) {
      setLoading(false);
    }
  }, [currentPage, currentCategory, categories]);

  //category click handler
  const categoryClicked = (category) => setCurrentCategory(category.id);

  //next page
  const next = (pageNumber) => setCurrentPage(pageNumber + 1);
  //previous page
  const previous = (pageNumber) => {
    if (pageNumber > 0) {
      setCurrentPage(pageNumber - 1);
    }
  };
  //save bookmark
  const bookmark = (book) => {
    if (bookmarked.length === 0) {
      setBookmarked([...bookmarked, book]);
    } else if (!bookmarked.some((val) => val.id === book.id)) {
      setBookmarked([...bookmarked, book]);
    }
  };

  //   console.log("heheh", categories);
  if (loading) {
    // console.log(categories);
    return <h2>loading...</h2>;
  }
  return (
    <div className="container">
      {/* {bookmarked.map((val) => console.log("wkwkwkw", val))} */}
      <h1>sejutaCita</h1>
      <Search setSearch={setSearch} />
      <Category categories={categories} categoryClicked={categoryClicked} />
      <h1>Bookmarked: {bookmarked.length}</h1>
      <br></br>
      <Books
        books={books}
        loading={loading}
        search={search}
        bookmark={bookmark}
        categories={categories}
      />

      <Navigation currentPage={currentPage} next={next} previous={previous} />
    </div>
  );
};

export default App;
