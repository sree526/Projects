/**
 * Created by raghu on 4/23/2016.
 */
var customer=require('../dbServices/customerDAO');
var order = require('../dbServices/orderDAO');
exports.placeOrder=function(req,res){
    order.placeOrder(req.session.customer,req.param('ar_farmerId'),req.param('ar_productId'),req.param('ar_price'),req.param('ar_quantity'),req.param('total_price'),function(results){
        res.send(results);
    });
};
exports.customerDetails=function(req,res){
    customer.getcustomerDetails(req.session.customer,function(response){
        res.send(response);
    })
};

exports.getBills=function(req,res){
    order.getBills(req.param('data'),function(response){
        res.send(response);
    })
};

exports.viewOrders=function(req,res){
    order.viewOrders(req.session.customer,function(response){
        res.send(response);
    })
}