var farmer = require('../dbServices/farmerDAO');
var product = require('../dbServices/productDAO');

exports.displayProducts = function(req,res){
    console.log("api:getFarmerProducts call sucessful");
    product.allProducts(function(response){
        res.send(response)
    });

};

exports.getFarmerDetails = function(req, res){
    console.log("entered farmer email" +  req.param("email"));
    farmer.getFarmer(req.session.farmer, function(response){
        res.send(response);
    });
};

exports.updateFarmerProfile=function(req,res){
    farmer.updateProfile(req.session.farmer,req.param("firstname"),req.param("lastname"),req.param("address1"),req.param("address2"),req.param("city")
        ,req.param("state"),req.param("zipcode"),req.param("phone_number"), function(response){
            res.send(response);
        });
};

exports.farmerAddProduct=function(req,res){

    console.log(req.session.farmer);
    product.addProduct(req.session.farmer,req.param("name"),req.param("price"),req.param("description"),req.param("image"),function(response){
        res.send(response);
    });
};

exports.deleteAccountFarmerPage=function(req,res){
    console.log(req.session.farmer);
    farmer.deleteAccountFarmerPage(req.session.farmer,function(response){
        req.session.destroy();
        //res.redirect('/');
        res.send(response);
    });
}

exports.deleteProductFarmerPage=function(req,res){

    farmer.deleteProductFarmerPage(req.param("productId"),function(response){
        res.send(response);
    });
}

exports.updateProductFarmerPage=function(req,res){

    console.log(req.session.farmer);
    product.updateProductFarmerPage(req.param("productId"),req.param("name"),req.param("price"),req.param("description"),req.param("image"),function(response){
        res.send(response);
    });
};
