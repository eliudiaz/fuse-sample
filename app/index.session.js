(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('sesion', sesion);

    /** @ngInject */
    function sesion(localStorageService) {

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

        function containsMenu(menu) {
            if (menu == "ACCESOS_MENU") {
                return false;
            }
            return true;
        }

        function containsAction(action) {
            return true;
        }

        return {
            exit: exit, user: user, id: id, pushPath: pushPath, pullPath: pullPath,
            containsMenu: containsMenu, containsAction: containsAction
        }

    }
})();