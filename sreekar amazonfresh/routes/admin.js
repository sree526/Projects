var admin = require('../dbServices/adminDAO');

exports.getCustomerRequests = function(req, res){
    admin.getCustomerRequests(function(response){
        res.send(response);
    });
};

exports.getFarmerRequests = function(req, res){
    admin.getFarmerRequests(function(response){
        res.send(response);
    });
};

exports.getProductRequests = function(req, res){
    admin.getProductRequests(function(response){
        res.send(response);
    });
};

exports.approveFarmer = function(req, res){
    admin.approveFarmer(req.param("farmer_id"), function(response){
        res.send(response);
    });
};

exports.approveCustomer = function(req, res){
    admin.approveCustomer(req.param("customer_id"), function(response){
        res.send(response);
    });
};

exports.approveProduct = function(req, res){
    admin.approveProduct(req.param("product_id"), function(response){
        res.send(response);
    });
};

exports.index = function(req, res){
    res.render('adminLoginPage');
};

exports.getRevenuePerDay=function(req,res){
    admin.getRevenuePerDay(function(response){
       res.send(response); 
    });
};

exports.getAllFarmers = function(req, res){
    admin.getAllFarmers( function(response){
        res.send(response);
    });
};


exports.getAllProducts = function(req, res){
    admin.getAllProducts( function(response){
        res.send(response);
    });
};


exports.getAllCustomers = function(req, res){
    admin.getAllCustomers( function(response){
        res.send(response);
    });
};

exports.getCustomerRideGraphDetails = function(req, res){
    admin.getCustomerRideGraphDetails(req.param("ssn"), function(response){
      res.send(response);
    });
};

exports.getAreaRideGraphDetails = function(req, res){
    admin.getAreaRideGraphDetails(req.param("area"), function(response){
        res.send(response);
    });
};

exports.getCustomerBillDetails= function(req, res){
    admin.getCustomerBillDetails(req.param("ssn"), function(response){
        res.send(response);
    });
};

exports.getBillDetailsById= function(req, res){
    admin.getBillDetailsById(req.param("billId"), function(response){
        res.send(response);
    });
};

exports.getAdminProfileDetails= function(req, res){
    admin.getAdminProfileDetails(function(response){
        res.send(response);
    });
};


exports.getCustomerById= function(req, res){
    admin.getCustomerById(req.param("ssn"), function(response){
        res.send(response);
    });
};

exports.getFarmerById= function(req, res){
    admin.getFarmerById(req.param("ssn"), function(response){
        res.send(response);
    });
};

exports.getProductById= function(req, res){
    admin.getProductById(req.param("productId"), function(response){
        res.send(response);
    });
};

exports.updateDeliveryStatus= function(req, res){
    admin.updateDeliveryStatus(req.param("orderId"), function(response){
        res.send(response);
    });
};