(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('sesion', sesion);

    /** @ngInject */
    function sesion($rootScope, $filter, Notification) {
        function exit() {
            Notification.error("No hay sesion activa!");
            Notification.error("Cerrando sesion...");
            var url = document.URL;
            url = url.substring(0, url.indexOf("fuse")) + "logout.jsp";
            console.debug("logout complete!!");
            localStorage.clear();
//            window.location = url;
        }

        function startT() {
            $rootScope.loadingProgress = true;
        }

        function endT() {
            $rootScope.loadingProgress = false;
        }

        function reject($state) {
            Notification.error("Acceso denegado!");
//            $state.go("app.home");
        }

        function user() {
            return JSON.parse(localStorage.getItem("currentUser"));
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
            if (u && u.accesos) {
                var f = $filter("filter")(u.accesos, {valor: o.url})[0];
                return f != null || o.url == "/home";
            }
            return false;
        }

        function containsAction(action) {
            return true;
        }

        return {
            exit: exit,
            user: user,
            id: id,
            pushPath: pushPath,
            pullPath: pullPath,
            lectorPath: lectorPath,
            authorized: authorized,
            containsAction: containsAction,
            reject: reject,
            startT: startT,
            endT: endT
        }

    }
})();