
// ----------------------------------------------------------------------

const posts = [];

const populateAccounts = (accounts) => {
  console.log(accounts)
  posts.length = 0
  for (let i = 0; i < accounts.length; i += 1) {
    const newAccount = {
      id: accounts[i]._id,
      title: accounts[i].accountName,
      accountno: accounts[i].accountNumber,
      type: accounts[i].accountType,
      amount: accounts[i].accountBalance
    }
    posts.push(newAccount)
  }
}

export { populateAccounts }
export default posts;