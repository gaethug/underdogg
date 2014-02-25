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
underdoggApp.controller('dummyListCtrl',function($rootScope, $scope, $location,dummyRest){
    $scope.dummies = [];
    var getDummies = function(){
        dummyRest.query(function(data){
            if(!!data){
                $scope.dummies = data.dummies;
            }
        });
    };
    getDummies();

    $scope.goEdit = function(dummyId){
        $location.path('/dummyEdit/'+dummyId);
    };

});
underdoggApp.controller('dummyCreateCtrl',function($routeParams, $rootScope,$scope,$location,Modal,dummyRest){
    $scope.dummyId = $routeParams.dummyId||'';
    if($scope.dummyId == ""){
        //create
        $scope.Content = "<h2>큰 제목</h2><h3>작은 제목</h3><div>본문을 작성해 주세요.</div>";
        $scope.somethingAttached = "";
    }else{
        //edit
        var getDummy = function(){
            dummyRest.get({dummyId:$scope.dummyId},function(data){
                if(!!data){
                    $scope.Content = data.dummy.Content;
                }
            });
        };
        getDummy();
    }
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
    $scope.editDummy = function(){
        dummyRest.update({dummyId:$scope.dummyId}, {Content:$scope.Content}, function (data) {
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
            if(!!result){
                if(result.ImageURL != ""){
                    $scope.somethingAttached = "<div><img src='"+result.ImageURL+"'></div>";
                }
            }
        });
    };
});