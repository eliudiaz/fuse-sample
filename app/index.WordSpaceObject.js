(function() {
    'use strict';

    angular
        .module('fuse')
        .factory('workSpace', workSpaceService);

    /** @ngInject */
    function workSpaceService($resource) {

        var data = {
            name: '',
            cui: '',
            error:'',
            session_token: '',
            rol:{
                id:'',
                nombre:'',
                accesos:[]
            },
            user: {
                correo:'',
                estado:'',
                nombres:'',
                apellidos:'',
                usuario:'',
                clave:'',
                fechaCreacion:'',
                creadoPor:'',
                cui:'',
                roles:[]
            },
            access:{
                valor:'',
                tipo:'',
                creadoPor:'',
                fechaCreacion:''
            },
            person:{}
        };

        return data;

    }

})();
