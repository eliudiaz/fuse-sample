(function ()
{
    'use strict';

    angular
            .module('fuse')
            .controller('IndexController', IndexController);

    /** @ngInject */
    function IndexController(fuseTheming, Idle, $scope, sesion)
    {
        var vm = this;

        // Data
        vm.themes = fuseTheming.themes;

        $scope.events = [];


        $scope.$on('IdleTimeout', function () {
            alert(0);
            sesion.exit();
        });
    }
})();