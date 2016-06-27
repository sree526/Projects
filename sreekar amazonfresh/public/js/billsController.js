/**
 * Created by raghu on 4/26/2016.
 */
routerApp.controller('billsController', [ '$scope', '$http', '$state','$localStorage', function($scope, $http, $state,$localStorage) {
    $scope.getBills=function(){
        console.log($localStorage.order_id);
        if($localStorage.order_status=="DELIVERED") {
            $scope.myVar = true;
        }
        $http({
            method: "POST",
            url: '/getBills',
            data: {
               data:$localStorage.order_id
            }
        }).success(function (data) {
            console.log(JSON.stringify(data));
            console.log(data.length);
            var temp_billid=-1;
            var temp_product_id=[],temp_quantity=[],temp_price=[],temp_name=[];
            $scope.bills=[{}];

            

           /* for(var i=0;i<data.length;i++){
                //if its a new bill
                if(data[i].bill_id!==temp_billid){

                    if(temp_billid!=-1) {
                        console.log(temp_name + "  " + temp_price + "  " + temp_quantity + "  " + temp_product_id);
                        $scope.bills.push({bill_id: temp_billid});
                        $scope.bills.push({products: temp_product_id});
                        $scope.bills.push({price: temp_price});
                        $scope.bills.push({quantity: temp_quantity});
                        $scope.bills.push({name:temp_name});
                    }
                    temp_billid=data[i].bill_id;
                    temp_product_id=[];temp_name=[];temp_price=[];temp_quantity=[];
                    temp_product_id.push(data[i].product_id);
                    temp_quantity.push(data[i].quantity);
                    temp_price.push(data[i].price);
                    temp_name.push(data[i].name);

                }//if its an existing one
                else{
                    temp_product_id.push(data[i].product_id);
                    temp_quantity.push(data[i].quantity);
                    temp_price.push(data[i].price);
                    temp_name.push(data[i].name)
                }
            }
            $scope.bills.push({bill_id:temp_billid});
            $scope.bills.push({products:temp_product_id});
            $scope.bills.push({price:temp_price});
            $scope.bills.push({quantity:temp_quantity});
            $scope.bills.push({name:temp_name});
            console.log(temp_name+"  "+temp_price+"  "+temp_quantity+"  "+temp_product_id);
            console.log(JSON.stringify($scope.bills));
            $scope.newbills=[{}];
            var bills=$scope.bills;
            console.log(bills.length);
            for(var i=1;i<bills.length;i++){
                $scope.newbills.push({bill_id:bills[1].bill_id});
                console.log(JSON.stringify(bills[2].products[0]));
                console.log(bills[i].products[0]);
                for(var j=0;j<bills[i+1].products.length;j++){
                    var temp=[];
                    temp.push({"product_id":bills[i+1].product_id[j]});
                    temp.push({"price":bills[i+2].price[j]});
                    temp.push({"quantity":bills[i+3].quantity[j]});
                    temp.push({"name":bills[i+4].name[j]});
                    $scope.newbills.push({"collection":temp});
                }

            }
            console.log($scope.newbills);*/
            temp_billid=-1;
            var bills2=[{}];
            var collection = [];
            for(var i=0;i<data.length;i++) {
                //if its a new bill
                if (data[i].bill_id !== temp_billid) {
                    // new and the first
                    if(temp_billid==-1) {
                        temp_billid=data[i].bill_id;

                        collection=[];
                        collection.push({"product_id":data[i].product_id,"name":data[i].name,"quantity":data[i].quantity,"price":data[i].price});
                    }
                    //if its a new but not the first
                        //bills2.push({"bill_id":temp_billid});
                    else {
                        bills2.push({"bill_id": temp_billid, "collection": collection});
                        temp_billid = data[i].bill_id;
                        collection = [];
                        collection.push({"product_id":data[i].product_id,"name":data[i].name,"quantity":data[i].quantity,"price":data[i].price});
                    }
                    //if its an existing one
                }
                else {
                    collection.push({"product_id":data[i].product_id,"name":data[i].name,"quantity":data[i].quantity,"price":data[i].price});
                }
            }
            bills2.push({"bill_id": temp_billid,"collection": collection});
           bills2.splice(0,1);
            console.log(JSON.stringify(bills2));
            $scope.bills2=bills2;
        }).error(function(error) {

        });
    }
}]);