'use strict';

/* Controllers */

var agentControllers = angular.module('agentControllers', []);

agentControllers.controller('AgentListCtrl', ['$scope', '$http', 'Agent',
    function($scope, $http, Agent) {
        var baseUrl = "/instrument/api/";

        $scope.agents = Agent.query();

        $scope.master = { module: "mi.instrument.virtual.driver",
                          klass: "InstrumentDriver",
                          host: "localhost",
                          commandPort: 20001,
                          eventPort: 20002 };

        $scope.start = function(newAgent) {
            $http({method: 'POST', url: baseUrl + $scope.newAgent.id, data: $scope.newAgent, headers: null}).
                success(function (data, status, headers, config) {
                    // TODO, redirect
                });
        };

        $scope.reset = function() {
            $scope.newAgent = angular.copy($scope.master);
        }
    }]);

agentControllers.controller('AgentDetailCtrl', ['$scope', '$http', '$routeParams', 'Agent',
    function($scope, $http, $routeParams, Agent) {
        var baseUrl = "/instrument/api/" + $routeParams.agentId;

        var execNoArgs = function (f) {
            $http({method: 'POST', url: baseUrl + "/" + f});
        };

        $scope.execute = function (cape) {
            $http({
                method: 'POST',
                url: baseUrl + "/execute",
                data: $.param({command: "\"" + cape + "\"", timeout: 60000}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        };

        $scope.agentid = $routeParams.agentId;

        $scope.connect = function() {
            execNoArgs("connect");
        };

        $scope.configure = function() {
            execNoArgs("configure");
        };

        $scope.discover = function() {
            execNoArgs("discover");
        };

        $scope.deleteAgent = function() {
            $http({method: 'DELETE', url: baseUrl}).
                success(function (data, status, headers, config) {
                    $scope.agent = Agent.get({agentId: $routeParams.agentId}, function (agent) {
                    });
                }).
                error(function (data, status, headers, config) {
                    $scope.agent = Agent.get({agentId: $routeParams.agentId}, function (agent) {
                    });
                });
        };

        // Below is the code that keeps the instrument state updated
        // This code is an infinite loop, but blocks on the server end unless
        // there is a state change...
        var getAgent = function (agentid, blocking) {
            $http({method: 'GET', url: baseUrl, params: {blocking: blocking}}).
                success(function (data, status, headers, config) {
                    $scope.agent = data;
                    getAgent(agentid, true);
                }).
                error(function (data, status, headers, config) {
                    // TODO - notify user
                });
        };
        // fire off our endless polling...
        getAgent($routeParams.agentId, false);
    }]);
