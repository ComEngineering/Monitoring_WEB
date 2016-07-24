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

router.get('/system-power', isAuthenticated, function(req, res, next) {
    res.render('system-power', { title: 'Teko' });
});

router.get('/system-logs', isAuthenticated, function(req, res, next) {
    res.render('system-logs', { title: 'Teko' });
});

router.get('/options-time', isAuthenticated, function(req, res, next) {
    res.render('options-time', { title: 'Teko' });
});

router.get('/options-net', isAuthenticated, function(req, res, next) {
    res.render('options-net', { title: 'Teko' });
});

router.get('/options-modbus', isAuthenticated, function(req, res, next) {
    res.render('options-modbus', { title: 'Teko' });
});

router.get('/modules-main', isAuthenticated, function(req, res, next) {
    res.render('modules-main', { title: 'Teko' });
});

router.get('/climats-cond', isAuthenticated, function(req, res, next) {
    res.render('climats-cond', { title: 'Teko' });
});

router.get('/climats-nagrevateli', isAuthenticated, function(req, res, next) {
    res.render('climats-nagrevateli', { title: 'Teko' });
});

router.get('/climats-pelte', isAuthenticated, function(req, res, next) {
    res.render('climats-pelte', { title: 'Teko' });
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}

module.exports = router;
