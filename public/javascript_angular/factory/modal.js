/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2013. 11. 12.
 * Time: 오전 10:47
 * To change this template use File | Settings | File Templates.
 */
underdoggApp.factory('Modal', function($modal, $log){
    return {
        message: function(title, message, buttons, callback){
            $modal.open({
                templateUrl: '/fragment/modal/message',
                controller: 'messageModal',
                resolve: {
                    model: function () {
                        return {
                            title: title,
                            message: message,
                            buttons: buttons
                        };
                    }
                }
            }).result.then(function (result) {
                    callback(result);
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        },
        open:function(options, callback){
            $modal.open(options).result.then(function (result) {
                callback(result);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }
});