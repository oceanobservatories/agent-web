'use strict';

/* Controllers */

var agentControllers = angular.module('agentControllers', []);

agentControllers.controller('AgentListCtrl', ['$scope', 'Agent',
    function($scope, Agent) {
        $scope.agents = Agent.query();
    }]);

agentControllers.controller('AgentDetailCtrl', ['$scope', '$routeParams', 'Agent',
    function($scope, $routeParams, Agent) {
        $scope.agent = Agent.get({agentId: $routeParams.agentId}, function(agent) {
        });
    }]);
