/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 2. 25.
 * Time: 오전 9:34
 * To change this template use File | Settings | File Templates.
 */
underdoggApp.controller('dummyMainCtrl',function($rootScope,$scope,Modal){
    $scope.popupOpen = function(){
        Modal.message("Message", "안녕하셔용. 모달팝업입니당.", [
            {result: 'ok', label: '닫기'}], function(){});
    };
});
underdoggApp.controller('dummyListCtrl',function($rootScope, $scope, dummyRest){
    $scope.dummies = [];
    var getDummies = function(){
        dummyRest.query({},{},function(data){
            if(!!data){
                $scope.dummies = data.dummies;
            }
        });
    };
    getDummies();

});
underdoggApp.controller('dummyCreateCtrl',function($rootScope,$scope,$location,Modal,dummyRest){
    console.log('asdasd');
    $scope.Content = "<h2>제목</h2><h3>작은 제목</h3><div>본문을 작성해 주세요.</div>";

    /*$scope.$watch('Content',function(newVal){
        console.log(newVal);
    });
    */
    $scope.createDummy = function(){
        dummyRest.create({}, {Content:$scope.Content}, function (data) {
            console.log(data);
            if (data.result == 'SUCCESS') {
                $location.path("/dummyList");
            }
        });
    };
    $scope.showAttachPopup = function(){
        Modal.open({
            templateUrl:  '/fragment/modal/attach',
            controller: 'attachCtrl'
        }, function(result){
            if(result!="FAIL"){
            }
        });
    };
});