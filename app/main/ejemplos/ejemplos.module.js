(function ()
{
    'use strict';

    angular
            .module('app.ejemplos', [])
            .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
                .state('app.ejemplos', {
                    url: '/ejemplos',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/ejemplos/ejemplos.html',
                            controller: 'ejemplosController as vm'
                        }
                    }
                });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/ejemplos');

        msNavigationServiceProvider.saveItem('fuse.ejemplos', {
            title: 'Ejemplos',
            icon: 'icon-tile-four',
            state: 'app.ejemplos',
            /*stateParams: {
             'param1': 'page'
             },*/
            translate: 'Ejemplos',
            weight: 1
        });
    }
})();