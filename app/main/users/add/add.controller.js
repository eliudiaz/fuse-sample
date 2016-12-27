(function () {
    'use strict';

    angular
            .module('app.users.add')
            .controller('addUserController', addUserController);

    /** @ngInject */
    function addUserController($scope, $timeout, $mdDialog, $state, workSpace, localStorageService, ws, ioRoles, f, Notification) {
        var vm = this;
        // Data
        vm.basicForm = {};
        var update = false;
        var valor;

        $scope.pasa = true;
        $scope.bloqueo = false;
        $scope.ccY = false;


        try {
            valor = localStorageService.get('workSpace').user.usuario;
        } catch (e) {

        }

        $scope.cancelar = function(){
            $state.go("app.users");
            Notification.warning('Haz Cancelado la Operacion');
        }

        if (valor) {
            vm.basicForm.nombre = localStorageService.get('workSpace').user.nombres;
            vm.basicForm.apellido = localStorageService.get('workSpace').user.apellidos;
            vm.basicForm.cui = localStorageService.get('workSpace').user.cui;
            vm.basicForm.usuario = localStorageService.get('workSpace').user.usuario;
            vm.basicForm.correo = localStorageService.get('workSpace').user.correo;
            vm.basicForm.bundle = localStorageService.get('workSpace').user.roles;
            vm.basicForm.super = false;
            if (vm.basicForm.bundle.length <= 0) {
                vm.basicForm.super = true;
                $scope.bloqueo = true;
            }
            update = true;
            $scope.pasa = false;
            $scope.ccY = true;
        }



        $scope.showAlert = function (ev) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .parent(angular.element(document.body))
                    .title('Guardado')
                    .textContent('Usuario Guardado Con Exito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent(ev)
                    );
        };

        if (workSpace.user.id) {
            vm.basicForm.cui = workSpace.user.user;
        }

        var entryViews = ws.allRol().query({}, function () {
            $scope.departamento = entryViews;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });



        //MULTI
        $scope.shopArr = ioRoles.query();
        $scope.bundle = [];
        //MULTI

        if (update) {
            //$scope.bundle.;
        }

        $scope.schNormalCui = function () {
            var obj = {
                cui: vm.basicForm.cui
            };

            if (!vm.basicForm.super) {
                $scope.entryUp = ws.searchPersona();
                var EntryUp = $scope.entryUp.post(obj, function () {
                    if (EntryUp.length > 0) {
                        $scope.pasa = false;
                        vm.basicForm.nombre = EntryUp[0].primerNombre;
                        vm.basicForm.apellido = EntryUp[0].primerApellido;
                        f('nombre');

                    } else {
                        workSpace.error = 'CUI NO ENCONTRADO';
                        $scope.Error();
                        $scope.pasa = true;
                    }

                    console.info(JSON.stringify(EntryUp));
                }, function (error) {
                    workSpace.error = error.data.message;
                    $scope.Error();
                });

            } else {
                $scope.bloqueo = true;
                $scope.pasa = false;
                f('nombre');
            }


        }

        $scope.check = function () {
            if (vm.basicForm.super) {
                $scope.pasa = false;
                $scope.bloqueo = true;
                f('nombre');
            } else {
                $scope.pasa = true;
                $scope.bloqueo = false;
            }
        }

        $scope.save = function () {
            var ro = [];

            if (vm.basicForm.bundle) {
                vm.basicForm.bundle.forEach(function (value, key) {
                    ro.push({id: vm.basicForm.bundle[key].id});
                });
            }

            if (vm.basicForm.super) {
                var obj = {
                    "cui": 1111111111111,
                    "usuario": vm.basicForm.usuario,
                    "correo": vm.basicForm.correo,
                    "estado": "ACTIVO",
                    "clave": vm.basicForm.password,
                    "confirmacionClave": vm.basicForm.password2,
                    "nombres": vm.basicForm.nombre,
                    "apellidos": vm.basicForm.apellido,
                    "creadoPor": "admin",
                    "root": true
                };
            } else {
                var obj = {
                    "usuario": vm.basicForm.usuario,
                    "estado": "ACTIVO",
                    "correo": vm.basicForm.correo,
                    "creadoPor": "admin",
                    "nombres": vm.basicForm.nombre,
                    "apellidos": vm.basicForm.apellido,
                    "clave": vm.basicForm.password,
                    "confirmacionClave": vm.basicForm.password2,
                    "cui": vm.basicForm.cui,
                    "root": false,
                    "roles": ro
                };
            }

            if (update) {
                var obj = {
                    "usuario": vm.basicForm.usuario,
                    "estado": "ACTIVO",
                    "correo": vm.basicForm.correo,
                    "creadoPor": "admin",
                    "nombres": vm.basicForm.nombre,
                    "apellidos": vm.basicForm.apellido,
                    "clave": vm.basicForm.password,
                    "confirmacionClave": vm.basicForm.password2,
                    "cui": vm.basicForm.cui,
                    "root": false,
                    "roles": ro,
                    "resetClave": vm.basicForm.cc
                };
            }


            if (update) {
                $scope.entryUp = ws.UpdateUser(valor);
                var EntryUp = $scope.entryUp.update(obj, function () {
                    $scope.showAlert();
                    $state.go("app.users");
                }, function (error) {
                    workSpace.error = JSON.stringify(error.data);
                    $scope.Error();
                });
            } else {
                $scope.entry = ws.saveUser();
                var entry = $scope.entry.save(obj, function () {
                    $scope.showAlert();
                    $state.go("app.users");
                }, function (error) {

                    workSpace.error = JSON.stringify(error.data);
                    $scope.Error();
                });
            }

        }

        $scope.Error = function (id) {
            $mdDialog.show({
                controller: function ($scope, $mdDialog, workSpace) {
                    $scope.closeDialog = function () {
                        $mdDialog.hide();
                    }
                },
                template: '<md-dialog>' +
                        ' <md-dialog-content>' +
                        '  Error: ' + workSpace.error + '' +
                        '</md-dialog-content>' +
                        '  <md-dialog-actions>' +
                        '    <md-button ng-click="closeDialog()" class="md-primary">' +
                        '      Close' +
                        '    </md-button>' +
                        '  </md-dialog-actions>' +
                        '</md-dialog>',
                parent: angular.element('body'),
                clickOutsideToClose: true
            });
        }

    }
})();
