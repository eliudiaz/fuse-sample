(function ()
{
    'use strict';

    angular
        .module('app.roles')
        .controller('rolesController', rolesController);

    /** @ngInject */
  function rolesController($scope,$timeout,$state,workSpace,localStorageService,ws){

        var entryViews = ws.allRol().query({}, function() {
             $scope.RolesData = entryViews;
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

        $scope.columnDefs.push({ headerName: "id", checkboxSelection: true,  field: "id", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Nombre", field: "nombre", filter: 'text', filterParams: { apply: true } });

        $timeout(function() {
	        $scope.gridOptions.api.setColumnDefs($scope.columnDefs);
	        $scope.gridOptions.api.setRowData($scope.RolesData);
	     }, 300);


        $scope.nuevo = function(){
            workSpace.rol.id = '';
            workSpace.rol.nombre = '';
            workSpace.rol.accesos = '';
            localStorageService.set('workSpace', workSpace);
            $state.go("app.roles_add");
        }

        $scope.edit = function(){
        	var ob = $scope.gridOptions.api.getSelectedRows();
            if(ob.length>0){
                var ob = $scope.gridOptions.api.getSelectedRows();
                workSpace.rol.id = ob[0].id;
                workSpace.rol.nombre = ob[0].nombre;
                workSpace.rol.accesos = ob[0].accesos;
                localStorageService.set('workSpace', workSpace);
                $state.go("app.roles_add");
            }
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
