/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 3. 30.
 * Time: 오후 4:04
 * To change this template use File | Settings | File Templates.
 */
underdoggApp.controller('postListCtrl',function($rootScope, $scope, $location,postRest){
    $scope.posts = [];
    var getDummies = function(){
        postRest.query(function(data){
            if(!!data){
                $scope.posts = data.posts;
            }
        });
    };
    getDummies();

    $scope.goEdit = function(dummyId){
        $location.path('/postEdit/'+dummyId);
    };

});