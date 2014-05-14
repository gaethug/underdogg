/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 5. 14.
 * Time: 오후 5:12
 * To change this template use File | Settings | File Templates.
 */
underdoggApp.controller('postMainCtrl',function($routeParams, $location, $rootScope, $sce,$scope,Modal, postRest){
    $scope.postId = $routeParams.postId;
    $scope.post = {};
    $scope.newComment = "";
   /* (function() {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    })();*/

    var iambusy = false;
    var getMain = function(){
        postRest.get({postId:$scope.postId}, function(data){
            console.log(data);
            if(data.post == null){
                $location.path('/');
                return false;
            }

            $scope.post = data.post;

            //youtube 이미지를 youtube 동영상으로 파싱하기 위해 html로 변경해서 파싱 후 다시 text로 돌리는 미친짓을.... 음...정규식으로 다 처리하기에는 ...
            var element = $('<div>').html(data.post.Contents);
            //var shareDescription = $(element).find("p").text().substring(0,100)+"...";
            var primaryImg = "";
            angular.forEach(element.find("img"), function(image, index){
                if(index==0){
                    primaryImg = image.src;
                }
                if(image.alt === "youtube"){
                    var youtubeId =$(image).attr('name');
                    $(image).replaceWith('<iframe width=\"400\" height=\"225\" src=\"http://www.youtube.com/embed/'+ youtubeId + '\" frameborder=\"0\"></iframe>');
                }
                //$(image).attr('image-click','showDetail()');
                $(image).addClass('contentImage');
                //$scope.$apply();

            });
            angular.forEach(element.find("div[class=IamMusicMan]"), function(musicLinkElm){
                var musicLink =$(musicLinkElm).text();
                $(musicLinkElm).replaceWith('<audio controls="controls" id="AudioPlayerInPost"><source src="'+musicLink+'"></audio>');
                angular.element("#AudioPlayerInPost").load();
            });
            $scope.post.Contents = $sce.trustAsHtml($(element).html());

            $scope.post.Comments.reverse();
            //$scope.post.CategoryValue = $rootScope.postTabs.filter(function(tab){return tab.Category == $scope.post.Category;})[0].Name;//categoryValue[$scope.post.Category];

            /*angular.element('html').find('meta[name=description]').attr('content', shareDescription);
            angular.element('html').find('meta[name=title]').attr('content', $scope.post.Title);
            angular.element('html').find('meta[name=url]').attr('content', 'http://www.underdogg.co.kr/post/'+$scope.postId);
            angular.element('html').find('meta[name=image]').attr('content', primaryImg||"http://www.underdogg.co.kr/images/icon100.png");*/

        });
    };
    getMain();

});