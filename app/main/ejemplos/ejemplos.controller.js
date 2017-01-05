(function ()
{
    'use strict';

    angular
            .module('app.ejemplos')
            .controller('ejemplosController', ejemplosController);

    /** @ngInject */
    function ejemplosController($scope, $timeout, $state, workSpace, localStorageService, wsEjemplos, sg, Notification, $mdDialog) {
        
        $scope.hola=function(){
            $scope.data=$scope.wsEjemplos.query({},function(){
                alert($scope.data);
            });
        }

    }
})();
