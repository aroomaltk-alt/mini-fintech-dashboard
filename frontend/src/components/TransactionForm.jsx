import { useState } from "react";
import axios from "axios";

function TransactionForm({ fetchTransactions }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/transactions",
        form
      );
      await fetchTransactions();

      alert("Transaction Added Successfully!");

      setForm({
        amount: "",
        category: "",
        type: "expense",
        date: "",
        note: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction");
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            name="category"
            placeholder="Category (Food, Salary, Travel...)"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <br />

        <div>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <textarea
            name="note"
            placeholder="Optional Note"
            value={form.note}
            onChange={handleChange}
            rows="4"
            cols="30"
          />
        </div>

        <br />

        <button type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm;