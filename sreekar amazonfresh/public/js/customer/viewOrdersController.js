/**
 * Created by raghu on 4/26/2016.
 */
routerApp.controller('viewOrdersController', ['$scope','$http','$localStorage','$state',function($scope, $http, $localStorage,$state) {
    $http({
        url:'/viewOrders',
        method:'get',
        data:{

        }
    }).success(function(data) {
        $scope.orders=data;

        for(var i=0; i < $scope.orders.length ; i++) {

            if($scope.orders[i].order_status == 'PLACED') {
                $scope.orders[i].order_status = 'INTRANSIT';
            }
        }
    })
        .error(function(err){

        });

    $scope.viewDetails=function(order_id,order_status){
      $localStorage.order_id=order_id;
      $localStorage.order_status=order_status;
        $state.transitionTo("app.billsPage", {}, {
            reload: true,
            inherit: false,
            notify: true
        });
    };
}]);