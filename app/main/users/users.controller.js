(function ()
{
    'use strict';

    angular
            .module('app.users')
            .controller('usersController', usersController);

    /** @ngInject */
    function usersController($scope, $timeout, $state, workSpace, localStorageService, ws, $mdDialog, sg, Notification) {

        var entryViews = ws.allUser().query({}, function () {
            $scope.usuarioData = entryViews;
            $timeout(function () {
                $scope.gridOptions.api.setColumnDefs($scope.columnDefs);
                $scope.gridOptions.api.setRowData($scope.usuarioData);
            }, 300);

        }, function (error) {
            workSpace.error = error.data.message;
            $scope.Error();
        });

        $scope.sg = sg.callSg();
        if ($scope.sg.usuarios.activo) {
            $state.go("app.home");
            Notification.error('No tienes Acceso a Usuarios');
        }

        //*************************
        // GRID OPTION
        $scope.gridOptions = {
            enableColResize: true,
            rowSelection: 'single',
            rowDeselection: true,
            columnDefs: $scope.columnDefs,
        };

        $scope.showConfirm = function (ev) {
            var ob = $scope.gridOptions.api.getSelectedRows();
            if (ob.length > 0) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                        .title('Seguro que desea Eliminar el Registro?')
                        .textContent('Se eliminara el registro selecto a continuacion')
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok('Eliminar')
                        .cancel('Cancelar');

                $mdDialog.show(confirm).then(function () {
                    $scope.entryUp = ws.deleteUser(ob[0].usuario);
                    var EntryUp = $scope.entryUp.delete(function () {
                        var entryViews = ws.allUser().query({}, function () {
                            $scope.usuarioData = entryViews;
                            $scope.gridOptions.api.setRowData($scope.usuarioData);
                        }, function (error) {
                            workSpace.error = error.data.message;
                            $scope.Error();
                        });
                    }, function () {

                    });
                }, function (error) {
                    workSpace.error = JSON.stringify(error.data);
                    $scope.Error();
                });


            } else {
                Notification.error('Selecciona un Registro Primero');
            }
        };

        $scope.columnDefs = [];

        $scope.columnDefs.push({headerName: "Usuario", checkboxSelection: true, field: "usuario", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Nombres", field: "nombres", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Apellidos", field: "apellidos", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Correo", field: "correo", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Estado", field: "estado", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Fecha Creacion", field: "fechaCreacion", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Creado Por", field: "creadoPor", filter: 'text', filterParams: {apply: true}});
<<<<<<< HEAD
=======


>>>>>>> feature/fingerprint-detection


        $scope.nuevo = function () {
            workSpace.user.correo = '';
            workSpace.user.usuario = '';
            workSpace.user.estado = '';
            workSpace.user.nombres = '';
            workSpace.user.apellidos = '';
            workSpace.user.fechaCreacion = '';
            workSpace.user.creadoPor = '';
            localStorageService.set('workSpace', workSpace);
            $state.go("app.users_add");
        }

        $scope.edit = function () {
            var ob = $scope.gridOptions.api.getSelectedRows();
            workSpace.user.correo = ob[0].correo;
            workSpace.user.usuario = ob[0].usuario;
            workSpace.user.estado = ob[0].estado;
            workSpace.user.cui = ob[0].cui;
            workSpace.user.nombres = ob[0].nombres;
            workSpace.user.apellidos = ob[0].apellidos;
            workSpace.user.fechaCreacion = ob[0].fechaCreacion;
            workSpace.user.creadoPor = ob[0].creadoPor;
            workSpace.user.roles = ob[0].roles;
            localStorageService.set('workSpace', workSpace);
            $state.go("app.users_add");
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
                        ' Error: ' + workSpace.error + '' +
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
