function SummaryCards({
  transactions
}) {

  const income = transactions
    .filter(
      (t) => t.type === "income"
    )
    .reduce(
      (sum, t) =>
        sum + Number(t.amount),
      0
    );

  const expense = transactions
    .filter(
      (t) => t.type === "expense"
    )
    .reduce(
      (sum, t) =>
        sum + Number(t.amount),
      0
    );

  const balance =
    income - expense;

  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) +
        Number(t.amount);
    }
  });

  const topCategory =
    Object.entries(categoryTotals)
      .sort(
        (a, b) => b[1] - a[1]
      )[0];

  return (
    <div>
      <h2>Summary</h2>

      <div>
        <h3>
          Total Income:
          ₹{income}
        </h3>

        <h3>
          Total Expense:
          ₹{expense}
        </h3>

        <h3>
          Net Balance:
          ₹{balance}
        </h3>

        <h3>
          Top Spending Category:
          {topCategory
            ? topCategory[0]
            : "No Expenses"}
        </h3>
      </div>
    </div>
  );
}

export default SummaryCards;