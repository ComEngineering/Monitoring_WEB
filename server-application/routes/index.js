var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/login', function(req, res, next) {
  res.render('signin', { title: 'Teko Monitoring', message: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true }
    ), function(req, res, next) {
        req.session.save(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
);

router.get('/', isAuthenticated, function(req, res, next) {
    res.render('home', { title: 'Teko' });
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;
