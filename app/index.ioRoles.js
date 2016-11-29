(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('ioRoles', ioRoles);

    /** @ngInject */
    function ioRoles($timeout, $window, $resource) {
        var path = localStorage.getItem("servicesPath") == null ?
                "http://localhost:41825/MS_RRHH_Servicios/" :
                localStorage.getItem("servicesPath");
        return $resource(path + 'roles/get/all', {}, {
            query: {method: 'GET', cache: true, isArray: true}
        });

    }
})();
