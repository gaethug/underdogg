/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 3. 30.
 * Time: 오후 4:04
 * To change this template use File | Settings | File Templates.
 */
underdoggApp.controller('postListCtrl',function($rootScope, $scope, $location,postRest){
    $scope.posts = [];
    $scope.pager = 0;
    $scope.perPage = 4;
    var getList = function(page, perPage){
        postRest.query({page:page / perPage, perpage : perPage},function(data){
            if(!!data){
                $scope.posts = data.posts;
            }
        });
    };
    $scope.loadMore = function(){
        getList($scope.pager, $scope.perPage);
    };
    $scope.loadMore();
    $scope.goEdit = function(dummyId){
        $location.path('/postEdit/'+dummyId);
    };

});