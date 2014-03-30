/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 2. 21.
 * Time: 오후 6:44
 * To change this template use File | Settings | File Templates.
 */
var underdoggApp = angular.module('UnderDogg',[
    'ngRoute','ngAnimate','ngCookies','ngResource','ngSanitize','ngTouch','ui.bootstrap', 'blueimp.fileupload']);

underdoggApp.config(function ($routeProvider, $locationProvider) {
    console.log('asdasd');
    $routeProvider.
        when('/', {templateUrl: '/fragment/home/main' })
        .when('/dummyMain', {templateUrl: '/fragment/dummy/main', controller:'dummyMainCtrl'})
        .when('/dummyCreate', {templateUrl: '/fragment/dummy/create', controller:'dummyCreateCtrl'})
        .when('/dummyEdit/:dummyId', {templateUrl: '/fragment/dummy/create', controller:'dummyCreateCtrl'})
        .when('/dummyList', {templateUrl: '/fragment/dummy/list', controller:'dummyListCtrl'})
        .when('/postList', {templateUrl: '/fragment/post/list', controller:'postListCtrl'})
        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});
underdoggApp.controller('mainCtrl',function($rootScope,$scope){
    console.log('asdasd');
    moment.lang('ko');

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
    $scope.attach = {};
    $scope.attach.ImageURL = "";
    $scope.attachSomething = function(){
        $modalInstance.close($scope.attach);
    };
    $scope.close = function(){
        $modalInstance.close();
    };
});
underdoggApp.controller('fileDestroyController',function($http,$scope){
    var file = $scope.file,
        state;
    if (file.url) {
        file.$state = function () {
            return state;
        };
        file.$destroy = function (callback) {
            state = 'pending';
            return $http({
                url: file.deleteUrl,
                method: file.deleteType
            }).then(
                function () {
                    state = 'resolved';

                    if(!!callback){
                        callback();
                    }

                    $scope.clear(file);


                    //-_- 부모가 머네
                    /*if(angular.isDefined($scope.$parent.$parent)){
                     $scope.$parent.$parent.$parent.uploadedPath = "";
                     }*/
                },
                function () {
                    state = 'rejected';
                }
            );
        };
    } else if (!file.$cancel && !file._index) {
        file.$cancel = function () {
            $scope.clear(file);
        };
    }
});