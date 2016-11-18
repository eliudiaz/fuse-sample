(function ()
{
    'use strict';

    angular
        .module('app.users')
        .controller('usersController', usersController);

    /** @ngInject */
  function usersController($scope,$timeout,$state,workSpace,localStorageService,ws,$mdDialog){
        
        var entryViews = ws.allUser().query({}, function() {
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

        $scope.columnDefs.push({ headerName: "Usuario", checkboxSelection: true,  field: "usuario", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Nombres", field: "nombres", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Apellidos", field: "apellidos", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Correo", field: "correo", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Estado", field: "estado", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Fecha Creacion", field: "fechaCreacion", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Creado Por", field: "creadoPor", filter: 'text', filterParams: { apply: true } });


        $timeout(function() {
	        $scope.gridOptions.api.setColumnDefs($scope.columnDefs);
	        $scope.gridOptions.api.setRowData($scope.usuarioData);
	     }, 300);


        $scope.nuevo = function(){
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

        $scope.edit = function(){
        	var ob = $scope.gridOptions.api.getSelectedRows();
            workSpace.user.correo = ob[0].correo;
            workSpace.user.usuario = ob[0].usuario;
            workSpace.user.estado = ob[0].estado;
            workSpace.user.nombres = ob[0].nombres;
            workSpace.user.apellidos = ob[0].apellidos;
            workSpace.user.fechaCreacion = ob[0].fechaCreacion;
            workSpace.user.creadoPor = ob[0].creadoPor;
            workSpace.user.roles = ob[0].roles;
            localStorageService.set('workSpace', workSpace);
            $state.go("app.users_add");

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
                    ' Error: '+ workSpace.error +'' +
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
