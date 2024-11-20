var app = angular.module('eventApp', []);

app.controller('eventController', function ($scope, $http) {
    $scope.event = {};
    $scope.events = [];

    // Fetch all events
    $scope.getEvents = function () {
        $http.get('/events').then(function (response) {
            $scope.events = response.data;
        }, function (error) {
            console.log('Error fetching events', error);
        });
    };

    // Add a new event
    $scope.addEvent = function () {
        if ($scope.event._id) {
            // Update existing event
            $http.put('/events/' + $scope.event._id, $scope.event).then(function (response) {
                $scope.getEvents();
                $scope.event = {}; // Clear the form
            }, function (error) {
                console.log('Error updating event', error);
            });
        } else {
            // Add new event
            $http.post('/events', $scope.event).then(function (response) {
                $scope.getEvents();
                $scope.event = {}; // Clear the form
            }, function (error) {
                console.log('Error adding event', error);
            });
        }
    };

    // Edit an event
    $scope.editEvent = function (event) {
        $scope.event = angular.copy(event); // Populate the form with selected event data
    };

    // Delete an event
    $scope.deleteEvent = function (id) {
        $http.delete('/events/' + id).then(function (response) {
            $scope.getEvents();
        }, function (error) {
            console.log('Error deleting event', error);
        });
    };

    // Initialize the event list
    $scope.getEvents();
});
