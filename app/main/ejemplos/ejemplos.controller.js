(function ()
{
    'use strict';

    angular
            .module('app.ejemplos')
            .controller('ejemplosController', ejemplosController);

    /** @ngInject */
    function ejemplosController($scope, $http, $timeout, $state, workSpace,
            localStorageService, wse, sg, Notification, $mdDialog) {
        var path = localStorage.getItem("servicesPath") == null ?
                "http://localhost:41825/MS_RRHH_Servicios/" :
                localStorage.getItem("servicesPath");
        $scope.hola = function () {
            $http.get(path + 'ejemplos/hola')
                    .then(function (response) {
                        alert(response.data);
                    });
        }

    }
})();
