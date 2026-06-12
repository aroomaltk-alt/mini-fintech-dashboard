import axios from "axios";
function TransactionList({
  transactions,
  fetchTransactions
})
 {
    const deleteTransaction =
  async (id) => {
    try {
      await axios.delete(
        `https://mini-fintech-dashboard.onrender.com/api/transactions/${id}`
      );

      await fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Transactions</h2>

      {transactions.map((t) => (
        <div
          key={t._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px"
          }}
        >
          <p>
            Category:
            {t.category}
          </p>

          <p>
            Amount:
            ₹{t.amount}
          </p>

          <p>
            Type:
            {t.type}
          </p>

          <p>
  Date: {
    new Date(t.date).toLocaleDateString("en-GB")
  }
</p>

          <p>
            Note:
            {t.note}
          </p>
          <button
  onClick={() =>
    deleteTransaction(t._id)
  }
>
  Delete
</button>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;