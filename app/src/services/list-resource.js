angular.module('ngCourse')

.factory('ListResource', function ($resource) {
    var res = $resource('http://192.168.4.162:3000/lists/:list', {
        list: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });

    res.prototype.greeting = function () {
        this.name = this.name + '1';
        this.$update();
    };

    return res;
});
