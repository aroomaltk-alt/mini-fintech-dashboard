import {
  PieChart,
  Pie,
  Tooltip,
  Cell
} from "recharts";

function SpendingChart({
  transactions
}) {

  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) +
        Number(t.amount);
    }
  });

  const chartData =
    Object.entries(categoryTotals).map(
      ([category, amount]) => ({
        name: category,
        value: amount
      })
    );

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8"
  ];
  let insight = "No spending data";

if (chartData.length > 0) {

  const highest =
    chartData.sort(
      (a, b) =>
        b.value - a.value
    )[0];

  insight =
    `Most spending is on ${highest.name}`;
}

  return (
    <div>
      <h2>Spending Chart</h2>

      <PieChart
        width={400}
        height={300}
      >
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {chartData.map(
            (entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            )
          )}
        </Pie>
        <Tooltip />
      </PieChart>
      <p>
  <strong>
    Insight:
  </strong>{" "}
  {insight}
</p>
    </div>
    
  );
}

export default SpendingChart;