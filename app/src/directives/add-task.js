angular.module('ngCourse')

.directive('addTask', function (TaskResource, $stateParams) {
    return {
        restrict: 'E',
        templateUrl: 'views/add-task.html',
        replace: true,
        scope: { tasks: '=model' },
        link: function (scope, element, attrs, ctrl) {
            element.find('input').on('keydown', function (e) {
                if (e.keyCode == 13 && scope.title) {
                    scope.$apply(function () {
                        var task = new TaskResource({
                            text: scope.title,
                            done: false
                        });

                        scope.tasks.push(task);

                        task.$save({
                            list: $stateParams.list
                        })

                        scope.title = '';
                    });
                }
            });

            scope.checkAll = function () {
                scope.tasks.forEach(function (task) {
                    if (!task.done) {
                        task.done = true;
                        scope.$emit('task-toggle', true);
                    }
                });
            };
        }
    };
});
