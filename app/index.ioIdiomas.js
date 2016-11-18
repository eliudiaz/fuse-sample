(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('ioIdioma', ioIdioma);

    /** @ngInject */
    function ioIdioma($timeout, $window, $resource) {
        var path = localStorage.getItem("servicesPath") == null ?
                "http://69.164.209.242:8080/MS_RRHH_Servicios/" :
                localStorage.getItem("servicesPath");
        return $resource(path + 'catalogos/get/all?tipo=IDIOMA', {}, {
            query: {method: 'GET', cache: true, isArray: true}
        });

    }
})();
