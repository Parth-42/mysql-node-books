import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

const AddBook = () => {
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    price: null,
    cover: "",
  });

  const handleFormState = (value, inputName) => {
    setFormState((prev) => ({ ...prev, [inputName]: value }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/books", formState);
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
            onChange={(e) => handleFormState(e.target.value, "title")}
          />
        </div>
        <div className="add-book-form-input">
          <input
            type="text"
            placeholder="Description..."
            onChange={(e) => handleFormState(e.target.value, "description")}
          />
        </div>

        <div className="add-book-form-input">
          <input
            type="number"
            placeholder="Price..."
            onChange={(e) => handleFormState(e.target.value, "price")}
          />
        </div>
        <div className="add-book-form-input">
          <input
            type="text"
            placeholder="Cover Image..."
            onChange={(e) => handleFormState(e.target.value, "cover")}
          />
        </div>

        <div className="add-book-form-btn">
          <button onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
