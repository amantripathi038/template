// ----------------------------------------------------------------------
const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
  contact: ''
};

const populateAccount = (user) => {
  account.displayName = user.name
  account.email = user.email
  account.contact = user.contact
}

export { populateAccount }

export default account;
