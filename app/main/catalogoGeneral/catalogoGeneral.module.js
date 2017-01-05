(function ()
{
    'use strict';

    angular
            .module('app.catalogoGeneral', [])
            .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
                .state('app.catalogoGeneral', {
                    url: '/catalogo',
                    views: {
                        'content@app': {
                            templateUrl: 'app/main/catalogoGeneral/catalogoGeneral.html',
                            controller: 'catalogoGeneralController as vm'
                        }
                    }
                });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogoGeneral');

        msNavigationServiceProvider.saveItem('fuse.catalogoGeneral', {
            title: 'Catalogo General',
            icon: 'icon-tile-four',
            state: 'app.catalogoGeneral',
            /*stateParams: {
             'param1': 'page'
             },*/
            translate: 'Catalogo General',
            weight: 1
        });
    }
})();