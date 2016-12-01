(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('sg', sg);

    /** @ngInject */
    function sg(localStorageService) {

        return {
            callSg: callSg
        }

        function callSg(id) {
            var data;

            if (!localStorageService.get('ActiveSegurity')) {
                data = localStorageService.get('DataActiveSegurity');
                data = {
                    persona: {
                        activo: false,
                        editar: false,
                        nuevo: false,
                        delete: false,
                        excel: false
                    },
                    roles: {
                        activo: false,
                        editar: false,
                        nuevo: false,
                        delete: false
                    },
                    usuarios: {
                        activo: false,
                        editar: false,
                        nuevo: false,
                        delete: false
                    },
                    accesos: {
                        activo: false,
                        editar: false,
                        nuevo: false,
                        delete: false
                    }
                };
                //localStorageService.set('ActiveSegurity', data);
            } else {
                data = localStorageService.get('ActiveSegurity');
                console.info('Puro Local');
            }




            return data;

        }


    }

})();
