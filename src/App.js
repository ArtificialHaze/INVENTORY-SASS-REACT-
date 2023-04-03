import "./App.css";
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);

  let itemName = useRef(null);
  let itemQuantity = useRef(null);

  useEffect(() => {
    itemName.current.focus();
  }, []);

  function handleQuantityChange(e) {
    setNewQuantity(e.target.value);
  }

  function handleItemChange(e) {
    setNewItem(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (currentIndex >= 0) {
      const updatedItem = [...items];
      updatedItem[currentIndex] = { item: newItem, quantity: newQuantity };
      setItems(updatedItem);
      setCurrentIndex(-1);
    } else {
      if (itemName.current.value === "" || itemQuantity.current.value === "") {
        window.alert("Please fill fields.");
      } else {
        setItems([...items, { item: newItem, quantity: newQuantity }]);
      }
    }

    setNewItem("");
    setNewQuantity("");
  }

  function handleDelete(index) {
    window.confirm("Are you sure?") &&
      setItems(items.filter((_, i) => i !== index));
  }

  function handleEdit(index) {
    setCurrentIndex(index);
    const { item, quantity } = items[index];
    setNewItem(item);
    setNewQuantity(quantity);
  }

  return (
    <div className="container">
      <h1 className="title text-center">Inventory</h1>
      <form
        onSubmit={handleSubmit}
        style={{ justifyContent: "center" }}
        className="d-flex"
      >
        <div className="form-group m-1">
          <input
            ref={itemName}
            placeholder="Item name.."
            style={{ border: "1px solid #7333f9" }}
            value={newItem}
            onChange={handleItemChange}
          />
        </div>
        <div className="form-group m-1">
          <input
            ref={itemQuantity}
            placeholder="Item Quantity.."
            style={{ border: "1px solid #7333f9" }}
            value={newQuantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {currentIndex >= 0 ? "Save" : "Add"}
        </button>
      </form>
      <ul className="container text-left" style={{ width: "420px" }}>
        {items.map((item, i) => {
          <li
            key={i}
            style={{ borderBottom: "1px solid #333" }}
            className="d-flex space-between mb-1"
          >
            {item.item} - ({item.quantity})
            <div>
              <button className="btn btn-sm" onClick={() => handleEdit(i)}>
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  handleDelete(i);
                }}
              >
                &times;
              </button>
            </div>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default App;
