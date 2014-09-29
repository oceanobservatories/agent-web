'use strict';

/* App Module */

var agentApp = angular.module('agentApp', [
  'ngRoute',

  'agentAnimations',
  'agentControllers',
  'agentFilters',
  'agentServices'
]);

agentApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/agents', {
        templateUrl: 'partials/agent-list.html',
        controller: 'AgentListCtrl'
      }).
      when('/agents/:agentId', {
        templateUrl: 'partials/agent-detail.html',
        controller: 'AgentDetailCtrl'
      }).
      otherwise({
        redirectTo: '/agents'
      });
  }]);
