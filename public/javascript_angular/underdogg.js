/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 2. 21.
 * Time: 오후 6:44
 * To change this template use File | Settings | File Templates.
 */
var underdoggApp = angular.module('UnderDogg',[
    'ngRoute','ngAnimate','ngCookies','ngResource','ngSanitize','ngTouch','ui.bootstrap']);

underdoggApp.config(function ($routeProvider, $locationProvider) {
    console.log('asdasd');
    $routeProvider.
        when('/', {templateUrl: '/fragment/home/main' })
        .when('/dummyMain', {templateUrl: '/fragment/dummy/main', controller:'dummyMainCtrl'})
        .when('/dummyCreate', {templateUrl: '/fragment/dummy/create', controller:'dummyCreateCtrl'})
        .when('/dummyList', {templateUrl: '/fragment/dummy/list', controller:'dummyListCtrl'})
        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});
underdoggApp.controller('mainCtrl',function($rootScope,$scope){
    console.log('asdasd');

});

underdoggApp.controller('messageModal',function($scope, $modalInstance, model){
    switch(model.title){
        case "info":
            $scope.title = "<i class='fa fa-info'></i>&nbsp; 알림";
            break;
        case "warning":
            $scope.title = "<i class='fa fa-warning'></i>&nbsp; 알림";
            break;
        default :
            $scope.title = "<i class='fa fa-info'></i>&nbsp; 알림";
            break;

    }
    $scope.message = model.message;
    $scope.buttons = model.buttons;

    $scope.close = function(result){
        $modalInstance.close(result);
    };
});
underdoggApp.controller('attachCtrl',function($scope, $modalInstance){

    $scope.close = function(){
        $modalInstance.close();
    };
});