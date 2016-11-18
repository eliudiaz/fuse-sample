(function ()
{
    'use strict';

    angular
        .module('app.accessos')
        .controller('accessosController', accessosController);

    /** @ngInject */
  function accessosController($scope,$timeout,$state,workSpace,localStorageService,ws){
        
        var entryViews = ws.allAccess().query({}, function() {
             $scope.usuarioData = entryViews;
        }, function(error) {
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

        $scope.columnDefs = [];

        $scope.columnDefs.push({ headerName: "Id", checkboxSelection: true,  field: "id", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Valor", field: "valor", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Tipo", field: "tipo", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Fecha Creacion", field: "fechaCreacion", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Creado Por", field: "creadoPor", filter: 'text', filterParams: { apply: true } });


        $timeout(function() {
	        $scope.gridOptions.api.setColumnDefs($scope.columnDefs);
	        $scope.gridOptions.api.setRowData($scope.usuarioData);
	     }, 300);


        $scope.nuevo = function(){
            workSpace.access.id = '';
            workSpace.access.valor = '';
            workSpace.access.tipo = '';
            workSpace.access.creadoPor = '';
            workSpace.access.fechaCreacion = '';
            localStorageService.set('workSpace', workSpace);
            $state.go("app.accessos_add");
        }

        $scope.edit = function(){
        	var ob = $scope.gridOptions.api.getSelectedRows();
        	workSpace.access.id = ob[0].id;
        	workSpace.access.valor = ob[0].valor;
        	workSpace.access.tipo = ob[0].tipo;
        	workSpace.access.creadoPor = ob[0].creadoPor;
        	workSpace.access.fechaCreacion = ob[0].fechaCreacion;
          	localStorageService.set('workSpace', workSpace);
            $state.go("app.accessos_add");

        }

        $scope.Error = function(id) {
            $mdDialog.show({
                controller: function($scope, $mdDialog, workSpace) {
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }
                },
                template: '<md-dialog>' +
                    ' <md-dialog-content>' +
                    ' Error:  '+ workSpace.error +'' +
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
