import axios from "axios";
import React, { useState, useEffect } from "react";
import Books from "./components/Books";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loading from "./components/Loading";
import Navigation from "./components/Navigation";
import SearchBar from "./components/SearchBar";
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
  const [bookmarked, setBookmarked] = useLocalStorage("bookmarked", []);
  const [error, setError] = useState(null);
  const [bookmarkedOpen, setBookmarkedOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const booksRes = await axios
        .get(
          `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${currentCategory}&page=${currentPage}&size=${booksPerPage}`
        )
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      const categoriesRes = await axios
        .get(
          "https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories"
        )
        .catch((err) => console.log("Category fetch error : ", err.response));
      if (booksRes.request.status === 200) {
        setError(false);
        setBooks(booksRes.data);
        setCategories(categoriesRes.data);
        setLoading(false);
      }
    };
    fetch();
  }, [currentPage, currentCategory, booksPerPage]);

  //category click handler
  const categoryClicked = (category) => {
    console.log("clicked", category);
    setCurrentPage(0);
    setCurrentCategory(category);
    setBookmarkedOpen(false);
  };

  const openBookmarked = () => setBookmarkedOpen(!bookmarkedOpen); //handle bookmark click

  //save bookmark
  const bookmark = (book) => {
    if (bookmarked.length === 0) {
      //check if bookmarke array is null
      setBookmarked([...bookmarked, book]);
    } else if (!bookmarked.some((val) => val.id === book.id)) {
      //check no duplicated book & add to bookmarked list
      setBookmarked([...bookmarked, book]);
    } else {
      // deleting book from bookmarked
      const index = bookmarked.findIndex(({ id }) => id === book.id);
      if (index !== -1) {
        setBookmarked([
          ...bookmarked.slice(0, index),
          ...bookmarked.slice(index + 1),
        ]);
      }
    }
  };

  //next page
  const next = (pageNumber) => setCurrentPage(pageNumber + 1);
  //previous page
  const previous = (pageNumber) => {
    if (pageNumber > 0) {
      setCurrentPage(pageNumber - 1);
    }
  };

  return (
    <>
      <Header />
      <SearchBar
        setSearch={setSearch}
        bookmarked={bookmarked}
        categories={categories}
        categoryClicked={categoryClicked}
        openBookmarked={openBookmarked}
        bookmarkedOpen={bookmarkedOpen}
        setBooksPerPage={setBooksPerPage}
      />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <h1>Could not find any books...</h1>
        ) : (
          <Books
            books={bookmarkedOpen ? bookmarked : books}
            loading={loading}
            search={search}
            bookmarked={bookmarked}
            bookmark={bookmark}
            categories={categories}
          />
        )}
        <Navigation currentPage={currentPage} next={next} previous={previous} />
      </div>
      <Footer />
    </>
  );
};

export default App;
