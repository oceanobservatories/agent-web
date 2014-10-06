'use strict';

/* Services */

var agentServices = angular.module('agentServices', ['ngResource']);

agentServices.factory('Agent', ['$resource',
    function($resource){
        return $resource('/instrument/api/:agentId', {}, {
            query: {method:'GET', params:{agentId:''}, isArray:true}
        });
    }]);
