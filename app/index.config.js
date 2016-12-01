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
//        IdleProvider.idle(5);
        IdleProvider.timeout(290); //5minutes
//        KeepaliveProvider.interval(2);
    }

})();