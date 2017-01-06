/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    'use strict';
    angular
            .module('fuse')
            .factory('wse', wsejemplosFn);
    /** @ngInject */
    function wsejemplosFn($rootScope, $filter, Notification, $resource, $http) {
        var path = localStorage.getItem("servicesPath") == null ?
                "http://localhost:41825/MS_RRHH_Servicios/" :
                localStorage.getItem("servicesPath");
        var data = {
            hola: function () {
                return $resource(path + 'ejemplos/hola', {'query': {method: 'GET'}});
            }};
        return data;
    }
})();

