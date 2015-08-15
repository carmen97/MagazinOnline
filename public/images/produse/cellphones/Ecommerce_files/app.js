var myApp=angular.module('myApp',['ngRoute']);

myApp.controller('ListController',['$scope','$http',function($scope,$http){
    $http.get('js/produse.json').success(function(data){
       
        $scope.produse=data;
    });
    
    $scope.getNumber = function(num) {
        return new Array(num);  
    };
}]);
        
        

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/home', {
    templateUrl: 'view/home.html'
  
  }).
  when('/produse',{
     templateUrl :'view/produse.html'
     
  }).
  otherwise({
    redirectTo: '/home'
  });
}]);
