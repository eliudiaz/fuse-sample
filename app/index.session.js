(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('sesion', session);

    /** @ngInject */
    function session(localStorageService) {

        function exit() {
            var url = localStorage.getItem("context") + "/logout.jsp";
            localStorage.clear();
            window.location = url;
        }

        function user() {
            return JSON.parse(localStorage.getItem("currentUser"));
        }

        function id() {
            return localStorage.getItem('sessionId');
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