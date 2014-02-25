/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 2. 22.
 * Time: 오후 6:09
 * To change this template use File | Settings | File Templates.
 */

underdoggApp.directive('activeNav', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var nestedA = element.find('a')[0];
            var path = nestedA.href;
            //console.log(path);
            var tabs = ['Create','List'];
            var currentPage = "";
            scope.location = $location;
            scope.$watch('location.absUrl()', function(newPath) {
                //console.log(newPath);
                for(var i = 0 ; i < tabs.length; i++){
                    if(!!(~path.indexOf(tabs[i]))){
                        currentPage = tabs[i];
                    }
                }
                if (!!(~newPath.indexOf(currentPage))) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }

    };

}]);