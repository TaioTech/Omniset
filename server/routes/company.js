const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Company = mongoose.model('company');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

router.get('/', (req, res) => {
  Company.find({status: 'public'})
  .populate('user')
  .sort({date: 'desc'})
  .then(company => {
    res.render('company/index', {
      company: company
    });
  });
});

// ***** START OF NEW COMPANY *****
// Page w/ Form
router.get('/add', ensureAuthenticated,(req, res) => {
  res.render('company/add')
});
// Form Process
router.post('/', (req, res) => {
  let hasLogo;

  if (req.body.hasLogo) {
    hasLogo = true;
  } else {
    hasLogo = false;
  }

  const newCompany = {
    title: req.body.title,
    description: req.body.description,
    established: req.body.established,
    employees: req.body.employees,
    status: req.body.status,
    hasLogo: hasLogo,
    primary: req.body.primary,
    secondary: req.body.secondary,
    user: req.user.id
  };

  new Company(newCompany)
  .save()
  .then(() => {
    res.redirect('/company/index');
    //res.redirect(`/company/show/${company.id}`);
  });



});


// ****** END OF NEW COMPANY ******



module.exports = router;