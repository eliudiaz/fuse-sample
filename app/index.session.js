(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('sesion', sesion);

    /** @ngInject */
    function sesion($filter) {
        function exit() {
            var url = localStorage.getItem("context") + "/logout.jsp";
            localStorage.clear()
            window.location = url;
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
            if (u.accesos) {
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
            containsAction: containsAction
        }

    }
})();