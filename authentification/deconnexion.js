exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/connexion');
  };