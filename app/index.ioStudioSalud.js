(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('ioStuSalud', ioStuSalud);

    /** @ngInject */
    function ioStuSalud($timeout, $window, $resource) {
        var path = localStorage.getItem("servicesPath") == null ?
                "http://localhost:41825/MS_RRHH_Servicios/" :
                localStorage.getItem("servicesPath");
        return $resource(path + 'catalogos/get/all?tipo=ESTUDIO_SALUD', {}, {
            query: {method: 'GET', cache: true, isArray: true}
        });

    }
})();
