(function ()
{
    'use strict';

    angular
            .module('app.roles')
            .controller('rolesController', rolesController);

    /** @ngInject */
    function rolesController($scope, $timeout, $state, workSpace, localStorageService, ws, sg, $mdDialog, Notification) {

        var entryViews = ws.allRol().query({}, function () {
            $scope.RolesData = entryViews;
            $timeout(function () {
                $scope.gridOptions.api.setColumnDefs($scope.columnDefs);
                $scope.gridOptions.api.setRowData($scope.RolesData);
            }, 300);
        }, function (error) {
            workSpace.error = error.data.message;
            $scope.Error();
        });
        //*************************
        // GRID OPTION
        $scope.gridOptions = {
            enableColResize: true,
            rowSelection: 'single',
            rowDeselection: true,
            columnDefs: $scope.columnDefs,
        };

        $scope.sg = sg.callSg();
        if ($scope.sg.roles.activo) {
            $state.go("app.home");
            Notification.error('No tienes Acceso a Roles');
        }


        $scope.columnDefs = [];

        $scope.columnDefs.push({headerName: "id", checkboxSelection: true, field: "id", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Nombre", field: "nombre", filter: 'text', filterParams: {apply: true}});


        $scope.showConfirm = function (ev) {
            var ob = $scope.gridOptions.api.getSelectedRows();
            if (ob.length > 0) {
                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                        .title('Seguro que desea eliminar el registro?')
                        .textContent('Se eliminara el registro selecto a continuacion')
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok('Eliminar')
                        .cancel('Cancelar');

                $mdDialog.show(confirm).then(function () {
                    $scope.entryUp = ws.deleteRol(ob[0].id);
                    var EntryUp = $scope.entryUp.delete(function () {
                        var entryViews = ws.allRol().query({}, function () {
                            $scope.RolesData = entryViews;
                            $scope.gridOptions.api.setRowData($scope.RolesData);
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


        $scope.nuevo = function () {
            workSpace.rol.id = '';
            workSpace.rol.nombre = '';
            workSpace.rol.accesos = '';
            localStorageService.set('workSpace', workSpace);
            $state.go("app.roles_add");
        }

        $scope.edit = function () {
            var ob = $scope.gridOptions.api.getSelectedRows();
            if (ob.length > 0) {
                var ob = $scope.gridOptions.api.getSelectedRows();
                workSpace.rol.id = ob[0].id;
                workSpace.rol.nombre = ob[0].nombre;
                workSpace.rol.accesos = ob[0].accesos;
                localStorageService.set('workSpace', workSpace);
                $state.go("app.roles_add");
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
                        ' Error:  ' + workSpace.error + '' +
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
