// ----------------------------------------------------------------------
const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

const populateAccount = (user) => {
  account.displayName = user.name
  account.email = user.email
}

export { populateAccount }

export default account;
