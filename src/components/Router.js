// Router.js
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Books from "../Pages/Books";
import AdminPage from "../Pages/AdminPage";
import Book from "../Pages/Book"; // Import the Book component

export const Router = () => {
  const [submittedBooks, setSubmittedBooks] = useState([]);

  const handleBookSubmit = (book) => {
    setSubmittedBooks((prevBooks) => [...prevBooks, book]);
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books books={submittedBooks} />}>
        {submittedBooks.map((book, id) => (
          <Route
            key={id}
            path={book.id}
            element={<Book books={submittedBooks} />}
          />
        ))}
      </Route>
      <Route
        path="/admin"
        element={<AdminPage onBookSubmit={handleBookSubmit} />}
      />
    </Routes>
  );
};
