(function ()
{
    'use strict';

    angular
            .module('fuse')
            .factory('ws', remoteServices);

    /** @ngInject */
    function remoteServices($resource, $http, sesion)
    {
//        var path = localStorage.getItem("servicesPath") == null ?
//                "http://45.79.200.203:8080/MS_RRHH_Servicios/" :
//                localStorage.getItem("servicesPath");
        var path = localStorage.getItem("servicesPath") == null ?
                "http://localhost:41825/MS_RRHH_Servicios/" :
                localStorage.getItem("servicesPath");

        var data = {

            allCatalogoG: function () {
                var r = $resource(path + 'catalogos/get/all?padre=-1');
                return r;
            },
            UpdateCatalogoG: function (id) {
                var r = $resource(path + 'catalogos/update/' + id + '?sesion=' + sesion.id(), null, {
                    'update': {method: 'PUT'}
                });
                return r;
            },
            deleteCatalogoG: function (id) {
                var r = $resource(path + 'catalogos/delete/' + id + '?sesion=' + sesion.id(), null, {
                    'delete': {method: 'DELETE', isArray: true}
                });
                return r;
            },
            saveCatalogoG: function () {
                var r = $resource(path + 'catalogos/save?sesion=' + sesion.id());
                return r;
            },
            saveHome: function () {
                var r = $resource(path + 'personas/crea?sesion=' + sesion.id());
                return r;
            },
            allUser: function () {
                var r = $resource(path + 'usuarios/get/all');
                return r;
            },
            saveUser: function () {
                var r = $resource(path + 'usuarios/crea?sesion=' + sesion.id());
                return r;
            },
            UpdateUser: function (id) {
                var r = $resource(path + 'usuarios/mod/' + id + '?sesion=' + sesion.id(), null, {
                    'update': {method: 'PUT'}
                });
                return r;
            },
            deleteUser: function (id) {
                var r = $resource(path + 'usuarios/disable/' + id + '?sesion=' + sesion.id(), null, {
                    'delete': {method: 'DELETE', isArray: true}
                });
                return r;
            },
            allRol: function () {
                var r = $resource(path + 'roles/get/all');
                return r;
            },
            saveRol: function () {
                var r = $resource(path + 'roles/crea?sesion=' + sesion.id());
                return r;
            },
            UpdateRol: function (id) {
                var r = $resource(path + 'roles/mod/' + id + '?sesion=' + sesion.id(), null, {
                    'update': {method: 'PUT'}
                });
                return r;
            },
            deleteRol: function (id) {
                var r = $resource(path + 'roles/disable/' + id + '?sesion=' + sesion.id(), null, {
                    'delete': {method: 'DELETE', isArray: true}
                });
                return r;
            },
            allAccess: function () {
                var r = $resource(path + 'accesos/get/all');
                return r;
            },
            allPersonas: function () {
                var r = $resource(path + 'personas/todos');
                return r;
            },
            UpdatePersonas: function (id) {
                var r = $resource(path + 'personas/mod/' + id + '?sesion=' + sesion.id(), null, {
                    'update': {method: 'PUT'}
                });
                return r;
            },
            getPersona: function (id) {
                var r = $resource(path + 'personas/get?cui=' + id);
                return r;
            },
            searchPersona: function () {
                var r = $resource(path + 'home/busquedaNormal', null, {
                    'post': {method: 'POST', isArray: true}
                });
                return r;
            },
            fileDownload: function ($headers) {
                $headers.responseType = "arraybuffer";
                $http($headers).success(function (data, status, headers, config) {
                    sesion.endT();
                    var xlsType = "application/vnd.ms-excel"; //"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    var blob = new Blob([data], {type: xlsType});
                    var objectUrl = URL.createObjectURL(blob);
                    document.getElementById('my_iframe').src = objectUrl;
                }).error(function (data, status, headers, config) {
                    console.error(data);
                });
            },
            searchTodosDownload: function () {
                data.fileDownload({
                    url: path + 'personas/todos?download=true',
                    method: "GET"
                });
            },
            searchNormalDownload: function (payload) {
                data.fileDownload({
                    url: path + 'home/busquedaNormal?download=true',
                    method: "POST",
                    data: payload
                });
            },
            deletePersona: function (id) {
                var r = $resource(path + '/personas/disable/' + id, null, {
                    'delete': {method: 'DELETE', isArray: true}
                });
                return r;
            },
            searchPersonaAvs: function () {
                var r = $resource(path + 'home/busquedaAvanzada', null, {
                    'post': {method: 'POST', isArray: true}
                });
                return r;
            },
            searchPersonaAvsDownload: function (payload) {
                data.fileDownload({
                    url: path + 'home/busquedaAvanzada?download=true',
                    method: "POST",
                    data: payload
                });
            },
            saveAccess: function () {
                var r = $resource(path + 'accesos/crea' + '?sesion=' + sesion.id());
                return r;
            },
            UpdateAccess: function (id) {
                var r = $resource(path + 'accesos/mod/' + id + '?sesion=' + sesion.id(), null, {
                    'update': {method: 'PUT'}
                });
                return r;
            },
            deleteAcess: function (id) {
                var r = $resource(path + 'accesos/disable/' + id + '?sesion=' + sesion.id(), null, {
                    'delete': {method: 'DELETE', isArray: true}
                });
                return r;
            },

            //CATALOGOS
            pais: function () {
                var r = $resource(path + 'areas-geograficas/get/all?tipo=PAIS');
                return r;
            },
            idiomas: function () {
                var r = $resource(path + 'catalogos/get/all?tipo=IDIOMA');
                return r;
            },
            depto: function () {
                var r = $resource(path + 'areas-geograficas/get/all?tipo=DEPARTAMENTOS&padre=74');
                return r;
            },
            muni: function (id) {
                try {
                    var r = $resource(path + 'areas-geograficas/get/all?tipo=MUNICIPIO&padre=' + id);
                } catch (e) {
                    console.error(e);
                }
                return r;
            },
            comLing: function () {
                var r = $resource(path + 'catalogos/get/all?tipo=COMUNIDAD_LING');
                return r;
            },
            nivelEducativo: function () {
                var r = $resource(path + 'catalogos/get/all?tipo=NIVEL_EDUCATIVO');
                return r;
            },
            nivelEducativoPadre: function (id) {
                try {
                    var r = $resource(path + 'catalogos/get/all?tipo=NIVEL_EDUCATIVO_GRADO&padre=' + id);
                } catch (e) {
                    console.error(e);
                }
                return r;
            },
            nivelEducativoCarrera: function (id) {
                try {
                    var r = $resource(path + 'catalogos/get/all?tipo=NIVEL_EDUCATIVO_CARRERA&padre=' + id);
                } catch (e) {
                    console.error(e);
                }
                return r;
            },
            nacionalidad: function () {
                var r = $resource(path + 'catalogos/get/all?tipo=NACIONALIDAD');
                return r;
            },
            expectativas: function () {
                var r = $resource(path + 'catalogos/get/all?tipo=EXPECTATIVAS');
                return r;
            },
            puestoFuncional: function () {
                var r = $resource(path + 'catalogos/get/all?tipo=PUESTO_FUNCIONAL');
                return r;
            },
            reglon: function () {
                var r = $resource(path + 'puestos/get/all?tipo=PUESTO_NOMINAL');
                return r;
            },
            puestoNominal: function (id) {
                var r = $resource(path + 'puestos/get/all?tipo=PUESTO_NOMINAL&padre=' + id);
                return r;
            },
            unidadEjecutora: function () {
                var r = $resource(path + 'unidades-ejecutoras/get/all');
                return r;
            },
            distrito: function (id) {
                var r = $resource(path + 'unidades-notificadoras/get/all?tipo=DISTRITO&padre=' + id);
                return r;
            },
            lugarEspesifico: function (id) {
                var r = $resource(path + '/unidades-notificadoras/get/all?tipo=LUGAR_ESPECIFICO&padre=' + id);
                return r;
            },
            comunidad: function (id) {
                var r = $resource(path + 'unidades-notificadoras/get/all?tipo=COMUNIDAD&padre=' + id);
                return r;
            },
            comunidad2: function (id) {
                var r = $resource(path + 'unidades-notificadoras/get/all?tipo=COMUNIDAD2&padre=' + id);
                return r;
            },
            clasificacionSer: function () {
                var r = $resource(path + 'catalogos/get/all?tipo=CLASIFICACION_SERVICIO');
                return r;
            },
            clasificacionSerArea: function (id) {
                var r = $resource(path + 'catalogos/get/all?tipo=CLASIFICACION_SERVICIO_AREA&padre=' + id);
                return r;
            }



        };


        return data;


    }



})();