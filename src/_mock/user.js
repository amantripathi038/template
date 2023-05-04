import account from "./account"

const transactions = []
const mapGraph1 = new Map()
const mapGraph2 = new Map()
const expenseButtons = [0, 0, 0, 0]
const dates = []
const spends = []

const populateTransactions = (expenses) => {
  mapGraph1.clear()
  mapGraph2.clear()
  transactions.length = 0
  transactions.push(...expenses)

  // let total = 0;

  expenses.forEach(({ date, amount, category }) => {
    // total += amount
    mapGraph1.set(date, (mapGraph1.get(date) || 0) + amount)
    mapGraph2.set(category, (mapGraph2.get(category) || 0) + amount)
  })

  /* Percentage is Not Needed
  mapGraph2.forEach((value, key) => {
    const percentage = (value * 100 / total)
    mapGraph2.set(key, percentage.toFixed(1))
  })
  */

  // Sort mapGraph1 based on keys
  const sortedMapGraph1 = new Map([...mapGraph1.entries()].sort());
  mapGraph1.clear();
  sortedMapGraph1.forEach((value, key) => {
    mapGraph1.set(key, value);
  });
  const todayDate = new Date()
  const todaysExpense = todayDate.toISOString().slice(0, 10)

  // Clear Old Data
  expenseButtons[0] = 0
  expenseButtons[1] = 0
  expenseButtons[2] = 0
  expenseButtons[3] = 0

  // Today's Expense
  expenseButtons[1] = (mapGraph1.get(todaysExpense) || 0)

  // Weekly Expense
  for (let i = 1; i <= 7; i += 1) {
    const exp = todayDate.toISOString().slice(0, 10)
    dates.push(exp)
    expenseButtons[0] += (mapGraph1.get(exp) || 0)
    todayDate.setDate(todayDate.getDate() - 1)
  }

  // Monthly Expense
  for (let i = 8; i <= 30; i += 1) {
    const exp = todayDate.toISOString().slice(0, 10)
    expenseButtons[2] += (mapGraph1.get(exp) || 0)
    todayDate.setDate(todayDate.getDate() - 1)
  }
  expenseButtons[2] += expenseButtons[0]

  // Previous Month
  // for (let i = 1; i <= 30; i += 1) {
  //   const exp = todayDate.toISOString().slice(0, 10)
  //   expenseButtons[3] += (mapGraph1.get(exp) || 0)
  //   todayDate.setDate(todayDate.getDate() - 1)
  // }
  // console.log(expenseButtons)
  expenseButtons[3] = account.salary
  for (let i = 0; i < 7; i += 1) {
    spends.push(mapGraph1.get(dates[i]) || 0)
  }

}
// Export the functions and variables for use in other modules
export { populateTransactions, dates, spends, mapGraph2, expenseButtons }
export default transactions
