var myApp = angular.module('myApp', ['ngRoute', 'firebase']).constant('FIREBASE_URL', 'https://techshop.firebaseio.com/produse');



myApp.controller('ListController', function($scope, $http, $firebase, FIREBASE_URL) {

    /*get data from json file
    $http.get('js/produse.json').success(function(data){
       
        $scope.produse=data;
        
    });*/


    var ref = new Firebase(FIREBASE_URL);
    var produse = $firebase(ref);
    $scope.produse = produse.$asArray();
    console.log($scope.produse);



    $scope.direction = '+pret';
    $scope.category = 'cellphones';
    $scope.catego = $scope.category;
    $scope.getNumber = function(num) {
        return new Array(num);
    };


    $scope.deleteItem = function(key) {
        console.log(key);
        produse.$remove(key);
        // alert(key);

    };

});

myApp.controller('PanouController', function($scope, $http, $firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var produse = $firebase(ref);
    $scope.produse = produse.$asArray();


    $scope.addProduct = function() {

        var model_produs = $scope.model_produs;
        var pret = $scope.pret;
        var categorie = $scope.category;
        var rating = $scope.rating;
        //console.log($scope.produse);

        var maxim = -1;
        for (var key in $scope.produse) {
            if (!isNaN(key)) {
                // console.log(key); 
                if (key > maxim) {
                    maxim = key;
                }
            }
        };
        idItem = Number(maxim) + 1;
        console.log(idItem);
       
        
      
        // console.log(maxim);
            var newProduct = {
                categorie: $scope.category,
                id: idItem,
                imagine: 'galaxys5',
                model: $scope.model_produs,
                stars: $scope.rating,
                pret: $scope.pret,
            };

        produse.$set(idItem, newProduct);

        $scope.model_produs = "";
        $scope.pret = "";
        $scope.category = "";
        $scope.rating = "";
    };


});

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'view/home.html'

        }).
        when('/produse', {
            templateUrl: 'view/produse.html',
            controller: 'ListController'

        }).
        when('/panou', {
            templateUrl: 'view/panou.html',
            controller: 'PanouController'

        }).
         when('/contact', {
            templateUrl: 'view/contact.html'
            

        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);