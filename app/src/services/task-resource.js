angular.module('ngCourse')

.factory('TaskResource', function ($resource) {
    var res = $resource('http://192.168.4.162:3000/tasks/:task', {
        task: '@_id'
    }, {
        update: {
            method: 'PUT'
        },
        save: {
            method: 'POST',
            url: 'http://192.168.4.162:3000/lists/:list/tasks'
        }
    });

    return res;
});
