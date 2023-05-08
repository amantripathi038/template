import account from "./account"

const transactions = []
const mapGraph1 = new Map()
const mapGraph2 = new Map()
const mapGraph3 = new Map()
const expenseButtons = [0, 0, 0, 0]
const dates = []
const spends = []

const populateTransactions = (expenses) => {
  mapGraph1.clear()
  mapGraph2.clear()
  mapGraph3.clear()
  transactions.length = 0
  transactions.push(...expenses)

  // let total = 0;

  expenses.forEach(({ date, amount, category }) => {
    // total += amount
    mapGraph1.set(date, (mapGraph1.get(date) || 0) + amount)
    const month = parseInt(date.slice(5, 7), 10);
    const currMonth = (new Date()).getMonth() + 1;
    if (month === currMonth) mapGraph2.set(category, (mapGraph2.get(category) || 0) + amount)
    mapGraph3.set(category, (mapGraph2.get(category) || 0) + amount)
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
  deepAnalysis(expenses)
}

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'long' });
}

const monthGraph = new Map()
const monthGraphArray = []
const deepAnalysis = (expenses) => {
  monthwiseGraph(expenses)
  comparisonGraph(expenses)
}

const monthwiseGraph = (expenses) => {
  monthGraph.clear()
  monthGraphArray.length = 0
  for (let i = 1; i <= 12; i += 1) {
    monthGraph.set(getMonthName(i), 0)
  }
  for (let i = 0; i < expenses.length; i += 1) {
    const date = getMonthName(expenses[i].date.slice(5, 7))
    monthGraph.set(date, monthGraph.get(date) + expenses[i].amount)
  }
  monthGraph.forEach((value, key) => {
    monthGraphArray.push({
      label: key,
      value
    })
  })
}

const thisMonthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const previousMonthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const prePreviousMonthArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
const dateLabels = []

const comparisonGraph = (expenses) => {
  dateLabels.length = 0
  thisMonthArray.fill(0)
  previousMonthArray.fill(0)
  prePreviousMonthArray.fill(0)
  const date = new Date()
  const currentMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const previousMonth = ((currentMonth - 1) <= 0 ? 12 : currentMonth - 1).toString().padStart(2, '0');
  const prePreviousMonth = ((currentMonth - 2) <= 0 ? 12 + (currentMonth - 2) : currentMonth - 2).toString().padStart(2, '0');
  for (let i = 4; i < 32; i += 3) {
    const d = `${currentMonth}/${i.toString().padStart(2, '0')}/${date.getFullYear()}`
    dateLabels.push(d)
  }
  for (let i = 0; i < expenses.length; i += 1) {
    const d = parseInt(expenses[i].date.slice(8, 10), 10)
    let idx = Math.floor((d - 1) / 3)
    if (idx > 9) idx = 9
    if (expenses[i].date.slice(5, 7) === currentMonth) {
      thisMonthArray[idx] += expenses[i].amount
    }
    else if (expenses[i].date.slice(5, 7) === previousMonth) {
      previousMonthArray[idx] += expenses[i].amount
    }
    else if (expenses[i].date.slice(5, 7) === prePreviousMonth) {
      prePreviousMonthArray[idx] += expenses[i].amount
    }
  }
}

// Export the functions and variables for use in other modules
export { populateTransactions, dates, spends, mapGraph2, expenseButtons, monthGraphArray, dateLabels, thisMonthArray, previousMonthArray, prePreviousMonthArray, mapGraph3 }
export default transactions
