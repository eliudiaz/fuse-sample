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
        IdleProvider.timeout(290); //5minutes
//        KeepaliveProvider.interval(2);//        IdleProvider.idle(5);
    }

})();