import React, { useEffect, useState } from "react";
import { firestore, collection, getDocs } from "../firebase";

const Book = ({ book }) => {
  const [additionalData, setAdditionalData] = useState(null);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const bookDocRef = collection(firestore, "books", book.id);
        const bookDocSnapshot = await getDocs(bookDocRef);
        const bookData = bookDocSnapshot.data();
        setAdditionalData(bookData);
      } catch (error) {
        console.error("Error fetching additional data: ", error);
      }
    };

    fetchAdditionalData();
  }, [book.id]);

  return (
    <div className="book-details-container">
      <img src={book.img} alt={book.coverPhoto} height={200} width={150} />
      <br />
      <strong>Title:</strong> {book.title} <br />
      <strong>Review:</strong> {book.description}
      {/* Render additional data if available */}
      {additionalData && (
        <>
          <br />
          <strong>Additional Info:</strong> {additionalData.someField}
        </>
      )}
    </div>
  );
};

export default Book;
