// ----------------------------------------------------------------------
const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
  contact: '',
  salary: 0
};

const populateAccount = (user) => {
  account.displayName = user.name
  account.email = user.email
  account.contact = user.contact
  account.salary = user.salary
}

export { populateAccount }

export default account;
