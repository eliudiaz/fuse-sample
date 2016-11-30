(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('sesion', session);

    /** @ngInject */
    function session(localStorageService) {

        function exit() {
            var url = localStorageService.get("context") + "/logout.jsp";
            localStorageService.clearAll();
            window.location = url;
        }

        function user() {
            return JSON.parse(localStorageService.get("currentUser"));
        }

        function id() {
            return localStorageService.get('sessionId');
        }

        function pushPath() {

        }

        function pullPath() {

        }

        return {
            exit: exit, user: user, id: id, pushPath: pushPath, pullPath: pullPath
        }

    }
})();