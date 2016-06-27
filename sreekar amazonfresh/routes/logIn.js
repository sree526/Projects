var customer = require('../dbServices/customerDAO');
var farmer = require('../dbServices/farmerDAO');
var admin = require('../dbServices/adminDAO');

function customerLogIn(req, res,next){
    var passport=require('passport');
    require('./passport')(passport);
    console.log(req.body.username);
    console.log(req.body);
    passport.authenticate('customerlogin', function(err,user, info) {
        console.log(user);
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('/');
        }
        if(user.statusCode==401){
            return res.send(user);

        }
        else{
            req.login(user, {session:false}, function(err) {
                if(err) {
                    return next(err);
                }
                console.log(user);
                req.session.customer = user;
                console.log("session initialized");
                //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                return res.send("success");
            });
        }
    })(req, res, next);
}

function farmerLogIn(req, res,next){
    var passport=require('passport');
    require('./passport')(passport);
    console.log(req.body.username);
    console.log(req.body);
    passport.authenticate('Farmerlogin', function(err,user, info) {
        console.log(user);
        if(err) {
            return next(err);
        }

        if(!user) {
            return res.redirect('/');
        }
        if(user.statusCode==401){
            return res.send(user);

        }
        else{
            req.login(user, {session:false}, function(err) {
                if(err) {
                    return next(err);
                }
                console.log(user);
                req.session.farmer = user;
                console.log("session initialized");
                //res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
                return res.send("success");
            });
        }
    })(req, res, next);
}

function adminLogIn(req, res){
    console.log("req" + req);
    admin.validateAdmin(req.param("email"), req.param("password"), function(response){
        console.log(response);
        if(response.statusCode==401){
            res.send(response);
        }
        else {
            req.session.admin = req.param("email");
            res.send(response);
        }
    });
}

exports.redirectToCustomerHomepage = function(req,res)
{
    //Checks before redirecting whether the session is valid
    if(req.session.customer)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("customerIndexHomePage");
    }
    else
    {
        res.redirect('/');
    }
};

exports.redirectToFarmerHomepage = function(req,res)
{
    //Checks before redirecting whether the session is valid
    if(req.session.farmer)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("farmerIndexHomePage");
    }
    else
    {
        res.redirect('/');
    }
};

exports.redirectToAdminHomepage = function(req,res)
{
    //Checks before redirecting whether the session is valid
    if(req.session.admin)
    {
        //Set these headers to notify the browser not to maintain any cache for the page being loaded
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.render("adminIndexHomePage");
    }
    else
    {
        res.redirect('/');
    }
};

exports.logout = function(req,res)
{
    req.session.destroy();
    res.redirect('/');
};
exports.customerLogIn = customerLogIn;
exports.farmerLogIn = farmerLogIn;
exports.adminLogIn = adminLogIn;
