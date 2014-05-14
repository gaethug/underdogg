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
        $scope.busy = true;
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            allowed = ((("" || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''),
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

        postRest.query({page:page / perPage, perpage : perPage},function(data){
            if(!!data){
                angular.forEach(data.posts, function(post){
                    var imgSrcs = (post.Contents.match(/<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g)||[]);
                    post.Contents = post.Contents.replace(/&nbsp;/g,'').replace(commentsAndPhpTags, '').replace(tags, function ($0, $1){return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';});
                    if(imgSrcs.length > 0){
                        post.AttachedImage = $(imgSrcs[0]).attr("src")+"?"+Math.random();
                    }
                    $scope.posts.push(post);
                });
                $scope.pager += $scope.perPage;
            }
            $scope.busy = false;
        });
        /*dummyRest.query(function(data){
            if(!!data){
                angular.forEach(data.dummies, function(post){
                    $scope.posts.push(post);
                });
                $scope.pager += $scope.perPage;
            }
        });*/
    };
    $scope.loadMore = function(){
        getList($scope.pager, $scope.perPage);
    };
    $scope.loadMore();
    $scope.goEdit = function(dummyId){
        $location.path('/postEdit/'+dummyId);
    };

});