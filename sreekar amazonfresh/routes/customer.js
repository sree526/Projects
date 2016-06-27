
var product = require('../dbServices/productDAO');

/*exports.getProductInfo = function(req,res){
    console.log("api call sucessful");
    var json_response={
        statusCode:200,
        productDetails:{
            "ProductName":"Cherry",
            "productPrice":"3.99",
            "productDescription": "Small but mighty never rang so true. And while their larger than life flavor may intimidate,remember this: It only takes one bite to bring these tasty monsters down.",
            "productId" : "B000NOCRO0",
            "productImage" : "",
            "productFarmerId" : ""
        }
    };
    res.send(json_response);

};*/

exports.getProductInfo = function(req,res){

    product.productInfo(req.param("id"),function(response){
        res.send(response)
    });
};

exports.getFarmerProducts = function(req,res){
    console.log("api:getFarmerProducts call sucessful "+ req.param("farmerId"));
    product.getProducts(req.param("farmerId"),function(response){
        res.send(response)
    });

};

exports.searchProducts = function(req,res){
  console.log("api:serachProducts call sucessfull" + req.param("search"));
    product.searchProducts(req.param("search"),function(response){
       res.send(response);
    });
};