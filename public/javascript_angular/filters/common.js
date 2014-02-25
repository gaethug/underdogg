/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2013. 11. 25.
 * Time: 오전 11:16
 * To change this template use File | Settings | File Templates.
 */
underdoggApp.filter('timeago', function() {
    return function(dateString) {
        return moment(dateString).fromNow();
    };
});

underdoggApp.filter('moment', function() {
    return function(dateString, displayType) {
        var displayType =displayType||"YYYY-MM-DD HH:mm";
        return moment(dateString).format(displayType);
    };
});