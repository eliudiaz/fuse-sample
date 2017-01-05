(function ()
{
    'use strict';

    angular
            .module('app.catalogoGeneral')
            .controller('catalogoGeneralController', catalogoGeneralController);

    /** @ngInject */
    function catalogoGeneralController($scope, $timeout, $state, workSpace, localStorageService, ws, sg, Notification, $mdDialog) {

        var entryViews = ws.allCatalogoG().query({}, function () {
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
        if ($scope.sg.accesos.activo) {
            $state.go("app.home");
            Notification.error('No tienes Acceso a Catalogo General');
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
                        .title('Seguro que desea eliminar el registro?')
                        .textContent('Se eliminara el registro selecto a continuacion')
                        .ariaLabel('Lucky day')
                        .targetEvent(ev)
                        .ok('Eliminar')
                        .cancel('Cancelar');

                $mdDialog.show(confirm).then(function () {

                    $scope.entryUp = ws.deleteCatalogoG(ob[0].id);
                    var EntryUp = $scope.entryUp.delete(function () {

                        var entryViews = ws.allCatalogoG().query({}, function () {
                            $scope.usuarioData = entryViews;
                            $scope.gridOptions.api.setRowData($scope.usuarioData);
                        }, function (error) {
                            workSpace.error = error.data.message;
                            $scope.Error();
                        });
                    }, function (error) {
                        workSpace.error = JSON.stringify(error.data);
                        $scope.Error();
                    });

                }, function () {

                });
            } else {
                Notification.error('Selecciona un Registro Primero');
            }
        };

        $scope.columnDefs = [];

        $scope.columnDefs.push({headerName: "Id", checkboxSelection: true, field: "id", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Valor", field: "valor", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Tipo", field: "tipo", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Estado", field: "estado", filter: 'text', filterParams: {apply: true}});
        $scope.columnDefs.push({headerName: "Codigo Padre", field: "codigoPadre", filter: 'text', filterParams: {apply: true}});




        $scope.nuevo = function () {
            workSpace.catalogoGeneral.id = '';
            workSpace.catalogoGeneral.valor = '';
            workSpace.catalogoGeneral.tipo = '';
            workSpace.catalogoGeneral.estado = '';
            workSpace.catalogoGeneral.codigoPadre = '';
            localStorageService.set('workSpace', workSpace);
            $state.go("app.catalogoGeneral_add");
        }

        $scope.edit = function () {
            var ob = $scope.gridOptions.api.getSelectedRows();
            workSpace.catalogoGeneral.id = ob[0].id;
            workSpace.catalogoGeneral.valor = ob[0].valor;
            workSpace.catalogoGeneral.tipo = ob[0].tipo;
            workSpace.catalogoGeneral.estado = ob[0].estado;
            workSpace.catalogoGeneral.codigoPadre = ob[0].codigoPadre;
            localStorageService.set('workSpace', workSpace);
            $state.go("app.catalogoGeneral_add");

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
