(function ()
{
    'use strict';

    angular
            .module('app.toolbar')
            .controller('ToolbarController', ToolbarController);

    /** @ngInject */
    function ToolbarController($rootScope, $mdSidenav, $translate, $mdToast, localStorageService, $state, sesion)
    {
        var vm = this;
  
        // Data
        $rootScope.global = {
            search: ''
        };

        vm.bodyEl = angular.element('body');
        vm.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];
        vm.languages = {

            es: {
                'title': 'Spanish',
                'translation': 'TOOLBAR.SPANISH',
                'code': 'es',
                'flag': 'es'
            }
        };

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.logout = logout;
        vm.changeLanguage = changeLanguage;
        vm.setUserStatus = setUserStatus;
        vm.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;

        //////////

        init();



        if (sesion.id() == null) {
            sesion.exit();
        }

        /**
         * Initialize
         */
        function init()
        {

            vm.user = sesion.user();
            // Select the first status as a default
            if (!vm.user || !vm.user.foto) {
                vm.user = {img: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAMDAwMDAwQEBAQFBQUFBQcHBgYHBwsICQgJCAsRCwwLCwwLEQ8SDw4PEg8bFRMTFRsfGhkaHyYiIiYwLTA+PlQBAwMDAwMDBAQEBAUFBQUFBwcGBgcHCwgJCAkICxELDAsLDAsRDxIPDg8SDxsVExMVGx8aGRofJiIiJjAtMD4+VP/CABEIAGAAYAMBIgACEQEDEQH/xAAbAAEBAQADAQEAAAAAAAAAAAAACAcEBQYJA//aAAgBAQAAAAD6QAADwOO8XevYAYbJIuDSARTloq7egSXhYp6igRLmI1a0gTDOopSlAfj87eveqv4BFOWtcswHV4jLIpzdO4eHwfE+GDlbRvkIgA//xAAXAQEBAQEAAAAAAAAAAAAAAAAAAwIB/9oACAECEAAAAKtMm6o5bqlh26HHboctoZ//xAAXAQADAQAAAAAAAAAAAAAAAAAAAQMC/9oACAEDEAAAAMCGGYl2ZiW0KDsxRLOWAN//xAA2EAABAwIDBQQIBgMAAAAAAAABAgMEBREGByEAEiAxURATQYEIFCIjMGFxkSQmMkBCgmJyof/aAAgBAQABPwD9hiTMvCWGVrakzO/kp0MaOnvFg9DyCdqj6QNQUtQptHYQnwVIWpwnyTu22gekBXEOj16lQnW/EMlbSvuor2wljihYyiKdgu7rqdHYztg4g/S+o+Y+BnJjuTh+KzR6c6pqXMbK3XUmym2b29noVEc9iSo3PPtBKSCDYjkRtlXiGRiPB8Z6SvvJEVa4zqzqVluxST87KF+POZxxeYFRC+TbUdKPp3aTw5AH8t1QdKhf7tp48+aYiPiWFOQpP4uFZQ8d5o2v9lcPo+SUKgVuNdO8l9le742UCL/8484XZa8f1Jt51SktJZSyDyQgtpVYeZ4cl5MhjHsNtsqCH2JCHR1SEFYv5p487MGVV+rorsGI4/HVEAlFA3y2Wr+0oD+NuAAqNhz2yYwJWabVnK1VIbkVAjFEdDuiypwi6t3mLAcciO1KjvMOp3m3UKQtPVKxY7VenuUmqToDmq4kl1lR6ltRTftwJDM/GNCZ3N4GoMqUn/FtQUr4Ob1Tw/UsVvKpbLiXmVFma5oEPONm28mx8ie3KLEeHMPVtZqTDpky1NMR5ACShgKNlFVyLX6jjqtbpFDj+s1KYxFa8FOrAv8AIDmT9NsV550hMCTGoLT7slbZS3JWju0IvpvAE3JHhe2xJUVEquTqSeDB+eFMap0SHXmpIfZbCDKQkOJWBoFKF7362vtR6/RsQR+/pk1iU347itR/snmnz7cQ5iYSwyVtzJ6VSE847PvXL9CBon+xG2JM9azO32aLGRBaOgeXZx4/Qck7T6jUKpIVJnSXZDyubjqys/c8cKfNp0hEmJJdjPJ/S40soUPMbYbzzr9O3GawwiosjTvRZt0Dy0VthzMbCWKChqJOS1IVyjP+7cv0F9Ff1J2JKjc6k8z8MEpNxoRyO3//xAAdEQEAAwACAwEAAAAAAAAAAAABAAIQICESMTJB/9oACAECAQE/AMK2fyNbB64UBdt1Z2n1t/rRTGKugsOiMRMKV4+BP//EABsRAQACAwEBAAAAAAAAAAAAAAEAEAISISAx/9oACAEDAQE/AK2IZD4zULx+Xn8vB5aDR1gBexHrDjDIa3fO7P/Z"};
            } else {
                vm.user.img = vm.user.foto;
            }
            vm.userStatus = vm.userStatusOptions[0];

            // Get the selected language directly from angular-translate module setting
            vm.selectedLanguage = vm.languages[$translate.preferredLanguage()];
        }


        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
            $mdSidenav(sidenavId).toggle();
        }

        /**
         * Sets User Status
         * @param status
         */
        function setUserStatus(status)
        {
            vm.userStatus = status;
        }

        /**
         * Logout Function
         */
        function logout()
        {
            sesion.exit();
        }

        /**
         * Change Language
         */
        function changeLanguage(lang)
        {
            vm.selectedLanguage = lang;

            /**
             * Show temporary message if user selects a language other than English
             *
             * angular-translate module will try to load language specific json files
             * as soon as you change the language. And because we don't have them, there
             * will be a lot of errors in the page potentially breaking couple functions
             * of the template.
             *
             * To prevent that from happening, we added a simple "return;" statement at the
             * end of this if block. If you have all the translation files, remove this if
             * block and the translations should work without any problems.
             */
            if (lang.code !== 'en')
            {
                var message = 'Fuse supports translations through angular-translate module, but currently we do not have any translations other than English language. If you want to help us, send us a message through ThemeForest profile page.';

                $mdToast.show({
                    template: '<md-toast id="language-message" layout="column" layout-align="center start"><div class="md-toast-content">' + message + '</div></md-toast>',
                    hideDelay: 7000,
                    position: 'top right',
                    parent: '#content'
                });

                return;
            }

            // Change the language
            $translate.use(lang.code);
        }

        /**
         * Toggle horizontal mobile menu
         */
        function toggleHorizontalMobileMenu()
        {
            vm.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
        }
    }

})();