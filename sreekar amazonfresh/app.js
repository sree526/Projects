
/**
 * Module dependencies.
 */
//adding comment
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , signUp = require('./routes/signUp')
  , logIn = require('./routes/logIn')
  , admin = require('./routes/admin')
  , http = require('http')
  , path = require('path')
  , farmer = require('./routes/farmer')
     ,order=require('./routes/order')
  , customer = require('./routes/customer')
  , products =require('./routes/products');
var passport=require('passport');


var mongoSessionConnectURL = "mongodb://localhost:27017/amazonfresh";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(expressSession({
    secret: 'cmpe273_teststring',
    resave: false,  //don't save session if unmodified
    saveUninitialized: false,	// don't create session until something stored
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    store: new mongoStore({
        url: mongoSessionConnectURL
    })
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

//page redirects
app.get('/customerIndexHomePage', logIn.redirectToCustomerHomepage);    /*getCustomerPage*/
app.get('/farmerIndexHomePage', logIn.redirectToFarmerHomepage);        /*getFarmerPage*/
app.get('/admin', admin.index);//getAdminPage
app.get('/adminIndexHomePage', logIn.redirectToAdminHomepage);          /*getAdminHomePage*/


//CustomerSignUp
app.post('/checkCustomerEmail', signUp.checkCustomerEmail);
app.post('/checkCustomerSSN', signUp.checkCustomerSSN);
app.post('/createCustomer', signUp.createCustomer);


//SignUp
app.post('/checkFarmerEmail', signUp.checkFarmerEmail);         /*farmer signup*/
app.post('/createFarmer', signUp.createFarmer);

//Login
app.post('/farmerLogIn', logIn.farmerLogIn);                    /*farmerLogIn*/
app.post('/adminLogIn', logIn.adminLogIn);                      /*admin Login*/
app.post('/customerLogIn', logIn.customerLogIn);                /*Customer Login*/

//logout
app.get('/logout',logIn.logout);

///api calls
app.post('/api/getProductInfo',customer.getProductInfo);       /*get product details*/
app.post('/api/getFarmerProducts',customer.getFarmerProducts); /*use's farmer unique value to navigate from anywpage farmer's page*/
app.get('/api/getFarmerProducts',farmer.displayProducts);      /*displays all products*/
app.post('/api/searchProducts',customer.searchProducts);


//admin approve requests
app.get('/getCustomerRequests', admin.getCustomerRequests );
app.get('/getFarmerRequests', admin.getFarmerRequests);
app.get('/getProductRequests', admin.getProductRequests);
app.post('/approveFarmer', admin.approveFarmer);
app.post('/approveCustomer', admin.approveCustomer);
app.post('/approveProduct', admin.approveProduct);

//admin module - information about all products, customers, farmers
app.get('/getAllFarmers', admin.getAllFarmers);
app.get('/getAllProducts', admin.getAllProducts);
app.get('/getAllCustomers', admin.getAllCustomers);

//getfarmervalues
app.get('/getFarmerDetails', farmer.getFarmerDetails);
app.post('/updateFarmerProfile',farmer.updateFarmerProfile);
app.post('/farmerAddProduct',farmer.farmerAddProduct);
app.get('/deleteAccountFarmerPage',farmer.deleteAccountFarmerPage);
app.post('/deleteProductFarmerPage',farmer.deleteProductFarmerPage);
app.post('/updateProductFarmerPage',farmer.updateProductFarmerPage);

//adminStatistics
app.get('/getRevenuePerDay', admin.getRevenuePerDay);
//placeorder
app.post('/placeOrder',order.placeOrder);
//getBills
app.post('/getBills',order.getBills);

//returning customer details
app.get('/customerDetails',order.customerDetails);

//viewOrdersOfaCustomer
app.get('/viewOrders',order.viewOrders);

//admin graphs
app.post('/getCustomerRideGraphDetails', admin.getCustomerRideGraphDetails);
app.post('/getAreaRideGraphDetails', admin.getAreaRideGraphDetails);

//admin bill details of customer/billid
app.post('/getCustomerBillDetails', admin.getCustomerBillDetails);
app.post('/getBillDetailsById', admin.getBillDetailsById);

//admin profile details
app.get('/getAdminProfileDetails', admin.getAdminProfileDetails);

//admin get individual details
app.post('/getCustomerById', admin.getCustomerById );
app.post('/getFarmerById', admin.getFarmerById );
app.post('/getProductById', admin.getProductById );

//update delivery status of an order
app.post('/updateDeliveryStatus', admin.updateDeliveryStatus);

mongo.connect(mongoSessionConnectURL, function(){
    console.log('Connected to mongo at: ' + mongoSessionConnectURL);
    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});
module.exports = app;