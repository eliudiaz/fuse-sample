(function ()
{
    'use strict';

    angular
            .module('fuse')
            .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, Notification, $timeout, $state, sesion)
    {

        // Activate loading indicator
        var stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, next)
        {
            $rootScope.loadingProgress = true;
        });

        // De-activate loading indicator
        var stateChangeSuccessEvent = $rootScope.$on('$stateChangeSuccess', function (event, next)
        {
            console.info("changing!!");
            console.info(sesion.authorized(next));
            if (sesion.user() == null) {
                sesion.exit();
            }
            if (!sesion.authorized(next)) {
                sesion.reject($state);
            }
            $timeout(function ()
            {
                $rootScope.loadingProgress = false;
            });
        });

        // Store state in the root scope for easy access
        $rootScope.state = $state;

        // Cleanup
        $rootScope.$on('$destroy', function ()
        {
            stateChangeStartEvent();
            stateChangeSuccessEvent();
        });

    }
})();