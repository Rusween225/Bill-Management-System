import React, { useState } from "react";
import axios from "axios";
import "../styles/InvoiceForm.css";

const InvoiceForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [contactDetails, setContactDetails] = useState("07");
  const [emailAddress, setEmailAddress] = useState("");
  const [items, setItems] = useState([{ name: "", price: "", quantity: "" }]);
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dateOfPurchase, setDateOfPurchase] = useState("");

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: "", quantity: "" }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total - discount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateTotal();

    const invoiceData = {
      customerName,
      contactDetails,
      items,
      discount,
      totalAmount,
      dateOfPurchase,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/generate",
        invoiceData,
        { responseType: "blob" }
      );

      // Download the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Clear the form after submission (after PDF is downloaded)
      setTimeout(() => {
        setCustomerName("");
        setContactDetails("07"); // Reset to default value or empty if desired
        setEmailAddress("");
        setItems([{ name: "", price: "", quantity: "" }]); // Reset the items to initial state
        setDiscount(0);
        setTotalAmount(0);
        setDateOfPurchase("");
      }, 500);  // Adding a slight delay to ensure form clears after PDF download
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  return (
    <div className="invoice-form">
      <h2>Generate Invoice</h2>
      <form onSubmit={handleSubmit}>
        <label>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />

        <label>Contact Details:</label>
        <input
          type="number"
          value={contactDetails}
          onChange={(e) => setContactDetails(e.target.value)}
          required
        />

        <label>Email Address:</label>
        <input
          type="text"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          required
        />

        <label>Items Purchased:</label>
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              required
            />
            <button type="button" onClick={() => removeItem(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addItem}>
          Add Item
        </button>

        <label>Discount:</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <label>Date of Purchase:</label>
        <input
          type="date"
          value={dateOfPurchase}
          onChange={(e) => setDateOfPurchase(e.target.value)}
          required
        />

        <button type="submit">Generate Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;


