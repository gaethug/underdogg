/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 2. 25.
 * Time: 오전 9:31
 * To change this template use File | Settings | File Templates.
 */
underdoggApp.factory("dummyRest", function($resource) {
    return $resource("/dummies/:dummyId", {}, {
        query:      {method: 'GET', cache:false},
        get:        {method: 'GET', cache:false},
        destroy:    {method: 'DELETE'},
        update:     {method: 'PUT'},
        create:     {method: 'POST'}
    });
});