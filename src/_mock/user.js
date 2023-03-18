// ----------------------------------------------------------------------

const transactions = []


const populateTransactions = (expenses) => {
  transactions.length = 0
  transactions.push(...expenses)
}

export { populateTransactions }

export default transactions;
