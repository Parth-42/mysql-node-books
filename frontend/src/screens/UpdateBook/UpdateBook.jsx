import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UpdateBook.css";

const AddBook = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [book, setBook] = useState({});
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const fetchBookById = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:8800/book/${id}`);
      setBook(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookById(id);
  }, [id]);

  useEffect(() => {
    if (book) {
      setFormState(book);
    }
  }, [book]);

  const handleFormState = (value, inputName) => {
    setFormState((prev) => ({ ...prev, [inputName]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/books/${id}`, formState);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1 className="add-book-heading">Add New Book</h1>

      <div className="add-book-form">
        <div className="add-book-form-input">
          <input
            type="text"
            placeholder="Title..."
            value={formState.title}
            onChange={(e) => handleFormState(e.target.value, "title")}
          />
        </div>
        <div className="add-book-form-input">
          <input
            type="text"
            placeholder="Description..."
            value={formState.description}
            onChange={(e) => handleFormState(e.target.value, "description")}
          />
        </div>

        <div className="add-book-form-input">
          <input
            type="number"
            placeholder="Price..."
            value={formState.price}
            onChange={(e) => handleFormState(e.target.value, "price")}
          />
        </div>
        <div className="add-book-form-input">
          <input
            type="text"
            placeholder="Cover Image..."
            value={formState.cover}
            onChange={(e) => handleFormState(e.target.value, "cover")}
          />
        </div>

        <div className="add-book-form-btn">
          <button onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
