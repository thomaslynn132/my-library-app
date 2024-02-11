//Books.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore, getDocs, collection } from "../firebase";
// ... (imports)

const Books = () => {
  const [submittedBooks, setSubmittedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollection = collection(firestore, "books");
        const booksSnapshot = await getDocs(booksCollection);
        const booksData = booksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSubmittedBooks(booksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books: ", error);
        setError("Failed to fetch books. Please try again later.");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books Page</h2>
      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="book-container">
        {submittedBooks.map((book) => (
          <div key={book.id} className="book">
            <Link to={`/books/${book.id}`}>
              {book.coverPhoto && (
                <img
                  src={book.coverPhoto}
                  alt="Selected Cover"
                  height={200}
                  width={150}
                />
              )}
              <br />
              <strong>Title:</strong> {book.title} <br />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
