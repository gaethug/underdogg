/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 2. 21.
 * Time: 오후 6:44
 * To change this template use File | Settings | File Templates.
 */
var underdoggApp = angular.module('UnderDogg',[
    'ngRoute','ngAnimate','ngCookies','ngResource','ngSanitize','ngTouch']);

underdoggApp.config(function ($routeProvider, $locationProvider) {
    console.log('asdasd');
    $routeProvider.
        when('/', {templateUrl: '/fragment/home/main' })
        .when('/testMain', {templateUrl: '/fragment/test/main'})
        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});
underdoggApp.controller('mainCtrl',function($rootScope,$scope){
    console.log('asdasd');
});