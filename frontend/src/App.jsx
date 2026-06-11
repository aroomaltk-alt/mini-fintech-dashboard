import { useEffect, useState } from "react";
import axios from "axios";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SummaryCards from "./components/SummaryCards";
import SpendingChart from "./components/SpendingChart";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/transactions"
      );

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions =
  selectedCategory === ""
    ? transactions
    : transactions.filter(
        (t) =>
          t.category?.trim().toLowerCase() ===
          selectedCategory.toLowerCase()
      );

  return (
    <div>
      <h1>Mini Fintech Dashboard</h1>

      <SummaryCards
        transactions={transactions}
      />

      <TransactionForm
        fetchTransactions={fetchTransactions}
      />

      <div>
        <h3>Filter By Category</h3>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Salary">
            Salary
          </option>

          <option value="Bills">
            Bills
          </option>
        </select>
      </div>

      <TransactionList
        transactions={filteredTransactions}
        fetchTransactions={fetchTransactions}
      />

      <SpendingChart
        transactions={transactions}
      />
    </div>
  );
}

export default App;