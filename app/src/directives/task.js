angular.module('ngCourse')

.directive('task', function (TaskResource) {
    return {
        restrict: 'E',
        templateUrl: 'views/task.html',
        scope: {
            task: '=model'
        },
        controller: function ($scope) {
            $scope.toggle = function () {
                var resource = new TaskResource($scope.task);
                resource.$update();
                $scope.$emit('task-toggle', $scope.task.done);
            };
        }
    };
});
