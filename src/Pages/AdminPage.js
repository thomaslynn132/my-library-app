//AdminPage.js
import React, { useState } from "react";
import { firestore, collection, addDoc } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BookImage } from "../Assets/Index";
export default function AdminPage({ onBookSubmit }) {
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(BookImage);

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setBookDescription(e.target.value);
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    setCoverPhoto(file);

    if (file) {
      // Declare the storage variable before using it
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `cover_photos/${Date.now()}_${file.name}`
      );

      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("File uploaded successfully!");
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!coverPhoto) {
        setCoverPhoto(BookImage);
      }

      const storage = getStorage();
      const storageRef = ref(
        storage,
        `cover_photos/${Date.now()}_${coverPhoto.name}`
      );

      // Upload cover photo to storage
      await uploadBytes(storageRef, coverPhoto);

      // Get the download URL for the cover photo
      const downloadURL = await getDownloadURL(storageRef);

      // Create a new book object with title, description, and coverPhoto URL
      const newBook = {
        title: bookTitle,
        description: bookDescription,
        coverPhoto: downloadURL,
      };

      // Add the new book to the Firestore collection
      const booksCollection = collection(firestore, "books");
      const newDocRef = await addDoc(booksCollection, newBook);

      // Callback to the parent component (Router) to update the books state
      onBookSubmit({ ...newBook, id: newDocRef.id });

      // Clearing the form inputs after submission
      setBookTitle("");
      setBookDescription("");
      setCoverPhoto("");
    } catch (error) {
      console.error("Error adding book: ", error);
    }
  };
  return (
    <div>
      <h2>Admin Page</h2>
      <form onSubmit={handleSubmit} className="BookSubmitForm">
        <label>
          Book Title:
          <input
            type="text"
            value={bookTitle}
            onChange={handleTitleChange}
            required
          />
        </label>
        <br />
        <label>
          Book Review:
          <textarea
            value={bookDescription}
            onChange={handleDescriptionChange}
            required
          />
        </label>
        <br />
        <label>
          Cover Photo:
          <input
            type="file"
            accept="image/*"
            onChange={handleCoverPhotoChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
