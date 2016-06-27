var mysql = require('./mysql');
var customerDAO = require('../dbServices/customerDAO');
var farmerDAO = require('../dbServices/farmerDAO');

function checkCustomerEmail(req, res) {
    console.log("entered" + req);
    var email = req.param("email");
    var query = "select * from customers where email='" + email + "'";

    if (email != undefined && email != "") {
        mysql.fetchData(function(err, results) {
            if (err) {
                throw err;
            } else {
                if (results.length == 1) {
                    json_responses = {
                        "statusCode" : 401,
                        "error" : "Email exists"
                    };
                    res.send(json_responses);
                } else {
                    json_responses = {
                        "statusCode" : 200,
                    };
                    res.send(json_responses);
                }
            }
        }, query);
    } else {
        json_responses = {
            "statusCode" : 401,
            "error" : "Email not defined"
        };
        res.send(json_responses);
    }
}

function checkCustomerSSN(req, res) {
    console.log("entered" + req);
    var ssn = req.param("ssn");
    var query = "select * from customers where customer_id='" + ssn + "'";

    if (ssn != undefined && ssn != "") {
        mysql.fetchData(function(err, results) {
            if (err) {
                throw err;
            } else {
                if (results.length == 1) {
                    json_responses = {
                        "statusCode" : 401,
                        "error" : "ssn exists"
                    };
                    res.send(json_responses);
                } else {
                    json_responses = {
                        "statusCode" : 200,
                    };
                    res.send(json_responses);
                }
            }
        }, query);
    } else {
        json_responses = {
            "statusCode" : 401,
            "error" : "ssn not defined"
        };
        res.send(json_responses);
    }
}

function createCustomer(req, res){
    var user = req.param("user");
    customerDAO.insertCustomerData(user, function(result) {
        if (result) {
            console.log("entered create customer");
            json_responses = {
                "statusCode": 200,
            }
            res.send(json_responses);
        } else {
            json_responses = {
                "statusCode": 401,
            }
            res.send(json_responses);
        }
    });
}

function checkFarmerEmail(req, res) {
    var email = req.param("email");
    if(email == "" && email == undefined){
        json_responses = {
            "statusCode" : 401,
            "error" : "Email not defined"
        };
        res.send(json_responses);
    }

    farmerDAO.checkFarmerEmail(email, function(response){
        res.send(response);
    });
}

function createFarmer(req, res){
    var farmer = req.param("farmer");
    var ssn = "" + farmer.customer_id_1 + farmer.customer_id_2 + farmer.customer_id_3;
    var vendorname = farmer.vendorname;
    //todo add all values are not null and undefined
    
    farmerDAO.getFarmerDetails(ssn, function(response){
        if(response){
            json_responses = {
                "statusCode" : 401,
                "error" : "ssn exists"
            };
            res.send(json_responses);
        } else {
            farmerDAO.checkUniqueVendorName(vendorname, function(response){
                if(response){
                    json_responses = {
                        "statusCode" : 401,
                        "error" : "vendor name exists"
                    };
                    res.send(json_responses);
                } else {
                    farmerDAO.insertFarmerData(farmer, function(result){
                        if(result){
                            json_responses = {
                                "statusCode" : 200
                            };
                            res.send(json_responses);
                        } else {
                            json_responses = {
                                "statusCode" : 401,
                                "error" : "unexpected error"
                            };
                            res.send(json_responses);
                        }
                    });
                }
            });
        }

    });
}

exports.checkCustomerEmail = checkCustomerEmail;
exports.checkCustomerSSN = checkCustomerSSN;
exports.createCustomer = createCustomer;
exports.checkFarmerEmail = checkFarmerEmail;
exports.createFarmer= createFarmer;
