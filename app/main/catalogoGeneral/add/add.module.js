(function ()
{
    'use strict';

    angular
        .module('app.catalogoGeneral.add', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider
            .state('app.catalogoGeneral_add', {
                url    : '/catalogoGeneral/add',
                views  : {
                    'content@app': {
                        templateUrl: 'app/main/catalogoGeneral/add/add.html',
                        controller : 'addController as vm'
                    }
                }
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/catalogoGeneral/add');

    
    }
})();