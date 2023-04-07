const transactions = []
const mapGraph1 = new Map()
const mapGraph2 = new Map()

const populateTransactions = (expenses) => {
  mapGraph1.clear()
  mapGraph2.clear()
  transactions.length = 0
  transactions.push(...expenses)

  let total = 0;

  expenses.forEach(({ date, amount, category }) => {
    total += amount
    mapGraph1.set(date, (mapGraph1.get(date) || 0) + amount)
    mapGraph2.set(category, (mapGraph2.get(category) || 0) + amount)
  })

  mapGraph2.forEach((value, key) => {
    const percentage = (value * 100 / total)
    mapGraph2.set(key, percentage.toFixed(1))
  })

  // Sort mapGraph1 based on keys
  const sortedMapGraph1 = new Map([...mapGraph1.entries()].sort());
  mapGraph1.clear();
  sortedMapGraph1.forEach((value, key) => {
    mapGraph1.set(key, value);
  });

}

// Export the functions and variables for use in other modules
export { populateTransactions, mapGraph1, mapGraph2 }
export default transactions
