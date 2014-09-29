'use strict';

/* Services */

var agentServices = angular.module('agentServices', ['ngResource']);

agentServices.factory('Agent', ['$resource',
    function($resource){
        return $resource('agents/:agentId.json', {}, {
            query: {method:'GET', params:{agentId:'agents'}, isArray:true}
        });
    }]);
