/**
 * Created by Akash on 4/19/2016.
 */

/* moved to customer.js
var product = require('../dbServices/productDAO');
exports.getProductInfo = function(req,res){
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

};
*/


/*moved to farmer.js
exports.addProduct=function(req,res){
        product.addProduct(req.param(product_name),req.param(product_price),req.param(product_description),req.session.email,function(response){
            res.send(response);
        });
};
*/

// was dangling
/*
exports.getProducts=function(req,res){
        product.getProducts(req.param(count),req.session.email,function(response){
           res.send(response);
        });
};*/

