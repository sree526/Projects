routerApp.controller('AllCustomersController', [ '$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.database_error = false;
        $scope.customer_requests = false;
        $scope.showCustomerFlag = true;

        $scope.currentValue = function(customer){
            $scope.currentCustomer = customer;
        };

        $scope.showCustomers = function(){
            $http({
                method : "GET",
                url : '/getAllCustomers',
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                    $scope.customer_requests = false;
                } else if(data.statusCode == 201){
                    $scope.database_error = false;
                    $scope.customer_requests = true;
                } else {
                    $scope.customers = data.customers;
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };

        $scope.toggleButton = function(){
            if($scope.showCustomerFlag) {
                $scope.showCustomerFlag = false;
            } else {
                $scope.showCustomerFlag = true;
            }
        };
    }]);

routerApp.controller('AllFarmersController', [ '$scope', '$http', '$state', '$window',
    function($scope, $http, $state, $window) {
        $scope.database_error = false;
        $scope.farmer_requests = false;
        $scope.showFarmerFlag = true;

        $scope.currentValue = function(farmer){
            $scope.currentFarmer = farmer;
        };


        $scope.showFarmers = function(){
            $http({
                method : "GET",
                url : '/getAllFarmers',
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                    $scope.farmer_requests = false;
                } else if(data.statusCode == 201){
                    $scope.database_error = false;
                    $scope.farmer_requests = true;
                } else {
                    $scope.farmers = data.farmers;
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };


        $scope.toggleButton = function(){
            if($scope.showFarmerFlag) {
                $scope.showFarmerFlag = false;
            } else {
                $scope.showFarmerFlag = true;
            }
        };
    }]);

routerApp.controller('AllProductsController', [ '$scope', '$http', '$window',
    function($scope, $http, $window) {
        $scope.database_error = false;
        $scope.product_requests = false;
        $scope.showProductFlag = true;

        $scope.currentValue = function(product){
            $scope.currentProduct = product;
        };


        $scope.showProducts = function(){
            $http({
                method : "GET",
                url : '/getAllProducts',
            }).success(function(data) {
                if (data.statusCode == 401) {
                    $scope.database_error = true;
                    $scope.product_requests = false;
                } else if(data.statusCode == 201){
                    $scope.database_error = false;
                    $scope.product_requests = true;
                } else {
                    $scope.products = data.products;
                }
            }).error(function(error) {
                $scope.unexpected_error = false;
            });
        };


        $scope.toggleButton = function(){
            if($scope.showProductFlag) {
                $scope.showProductFlag = false;
            } else {
                $scope.showProductFlag = true;
            }
        };
    }]);