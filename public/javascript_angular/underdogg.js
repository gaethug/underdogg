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
        .when('/testCreate', {templateUrl: '/fragment/test/create', controller:'testCtrl'})
        .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});
underdoggApp.controller('mainCtrl',function($rootScope,$scope){
    console.log('asdasd');
});
underdoggApp.controller('testCtrl',function($rootScope,$scope){
    console.log('asdasd');
    $scope.content = "<h1><span>마우스</span>로 글자를 드래그 해보세요.</h1><h3>이것은 Medium wannabe editor입니다.&nbsp;</h3><div>이 녀석의 출처는 <a href='https://github.com/sofish/pen'>이곳</a> 입니다.</div><div>어찌되었건. <b>angularJS</b>에서 일반 <i>javascrpit</i> 라이브러리를 쓰려면 약간의 귀차니즘을 동원해야 합니다.&nbsp;</div><div><br></div><p><b>2-way binding</b> 규칙을 지켜줘야 하거든요. 그렇기 때문에 view, model 각각 변화를 캐치하고 있다가 둘중 하나가 변경되면 서로 동기화를 시켜줘야 합니다. 굉장히 지랄맞을 수 있는게 view가 변경되어 model에 view값을 넣어줬는데 또 model은 변화를 캐치해서 그 값을 다시 view에 넣는 미친 회전을 할 수 있거든요. 그런데 다행히. model은 최초 페이지 로딩시 단 한번만 넣어줍니다.&nbsp;<br></p><p>새벽에 헛소리작렬... 자야지..</p> ";

    $scope.$watch('content',function(newVal){
        console.log(newVal);
    });
});