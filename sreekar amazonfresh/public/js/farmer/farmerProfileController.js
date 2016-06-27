routerApp.controller('farmerProfileController', ['$scope','$http','$localStorage', function($scope, $http, $localStorage) {
    $http({
        method: "GET",
        url: "/getFarmerDetails"
    }).success(function (data) {
        if (data.statusCode ==  401) {
            console.log('error');
        } else {
            $scope.farmer = data.farmer;
            $localStorage.farmer_gen_id=data.farmer.gen_id;
        }
    }).error(function (error){
        console.log(error);
    });

    $scope.updateFarmerProfile=function() {
        $scope.success=false;
        $http({
            method: "POST",
            url: "/updateFarmerProfile",
            data: {
                firstname: $scope.farmer.firstname,
                lastname: $scope.farmer.lastname,
                address1:$scope.farmer.address1,
                address2:$scope.farmer.address2,
                city:$scope.farmer.city,
                state:$scope.farmer.state,
                zipcode:$scope.farmer.zipcode,
                phone_number:$scope.farmer.phone_number
            }
        }).success(function (data) {
            if (data.statusCode == 401) {
                console.log('error');
            } else {
                if(data.statusCode==200) {
                    $scope.success=true;
                }
            }
        }).error(function (error){
            console.log(error);
        });
    };

    $scope.farmerAddProduct=function() {
        console.log($scope.file.$ngfDataUrl);
        $scope.success=false;
        $http({
            method: "POST",
            url: "/farmerAddProduct",
            data: {
                gen_id: $localStorage.farmer_gen_id,
                price: $scope.productPrice,
                name:$scope.productName,
                description:$scope.productDescription,
                image:$scope.file.$ngfDataUrl
            }
        }).success(function (data) {
            if (data.statusCode == 401) {
                console.log('error');
            } else {
                if(data.statusCode==200) {
                    $scope.success=true;
                }
            }
        }).error(function (error){
            console.log(error);
        });
    };

    $scope.deleteFarmer=function() {

        $http({
            method: "GET",
            url: "/deleteAccountFarmerPage"
        }).success(function (data) {
            if (data.statusCode == 401) {
                console.log('error');
            } else {
                if(data.statusCode==200) {
                    window.location.assign("/");
                }
            }
        }).error(function (error){
            console.log(error);
        });
    };



}]);
