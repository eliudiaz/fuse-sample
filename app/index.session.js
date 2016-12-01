(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('sesion', sesion);

    /** @ngInject */
    function sesion(localStorageService, $filter) {
        var cUser = null;
        function exit() {
            var url = localStorageService.get("context") + "/logout.jsp";
            localStorageService.clearAll();
            window.location = url;
        }

        function user() {
            if (cUser == null) {
                cUser = angular.fromJson(localStorageService.get("currentUser"));
            }
            return cUser;
        }

        function id() {
            return localStorage.getItem('sessionId');
        }

        function pushPath() {
            return localStorage.getItem("pushPath");
        }

        function pullPath() {
            return localStorage.getItem("pullPath");
        }

        function lectorPath() {
            return localStorage.getItem("lectorPath");
        }

        function authorized(o) {
            var u = user();
            var f = $filter("filter")(u.accesos, {valor: o.url})[0];
            return f != null || o.url == "/home";
        }

        function containsAction(action) {
            return true;
        }

        return {
            exit: exit, user: user, id: id,
            pushPath: pushPath,
            pullPath: pullPath,
            lectorPath: lectorPath,
            authorized: authorized,
            containsAction: containsAction
        }

    }
})();