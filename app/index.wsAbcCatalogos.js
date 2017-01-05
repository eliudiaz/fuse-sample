/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function () {
    'use strict';

    angular
            .module('fuse')
            .factory('wsCG', wsCG);

    /** @ngInject */
    function wsCG($rootScope, $filter, Notification) {
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

