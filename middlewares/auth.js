//* check if the user is authenticated or not authenticated and redirect to the login page if necessary
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

module.exports = isLoggedIn;
