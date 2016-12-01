(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('ioSelect', ioSelect);

    /** @ngInject */
    function ioSelect($timeout, $window, $resource) {
        var path = localStorage.getItem("servicesPath") == null ?
                "http://localhost:41825/MS_RRHH_Servicios/" :
                localStorage.getItem("servicesPath");

            /*    var path = localStorage.getItem("servicesPath") == null ?
                "http://45.79.200.203:8080/MS_RRHH_Servicios/" :
                localStorage.getItem("servicesPath"); */
                
        return $resource(path + 'accesos/get/all', {}, {
            query: {method: 'GET', cache: true, isArray: true}
        });

    }
})();
