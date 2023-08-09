import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);

  const fetchAllBooks = async () => {
    try {
      const { data } = await axios.get("http://localhost:8800/books");
      setBooks(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const navigate = useNavigate();

  const handleUpdateNavigation = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/book/${id}`);
      navigate(0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books">
      <h1 className="books-title">Books</h1>
      <div className="books-container">
        {books.map((book) => {
          return (
            <div className="book" key={book.id}>
              <div className="book-cover">
                <img
                  src={
                    book.cover && book.cover.length > 0
                      ? book.cover
                      : "https://m.media-amazon.com/images/I/819VuAo9yEL._AC_UF1000,1000_QL80_.jpg"
                  }
                />
              </div>

              <div className="book-details">
                <h2>{book.title}</h2>
                <p>{book.description}</p>
                <span>₹ {book.price}</span>
              </div>

              <div className="book-buttons">
                <button
                  className="btn-primary"
                  onClick={() => handleUpdateNavigation(book.id)}
                >
                  Update
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="add-book-button">
        <Link to="/add">
          <button>Add New Book</button>
        </Link>
      </div>
    </div>
  );
};

export default Books;
