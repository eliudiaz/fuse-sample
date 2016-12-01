(function ()
{
    'use strict';

    angular
            .module('fuse')
            .config(config)
            .run(function (Idle) {
                Idle.watch();
            });

    /** @ngInject */
    function config(IdleProvider, KeepaliveProvider)
    {
        IdleProvider.idle(10000000000);
        IdleProvider.timeout(100000000);
        KeepaliveProvider.interval(2);
    }

})();