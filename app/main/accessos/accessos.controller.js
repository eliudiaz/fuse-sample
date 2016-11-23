(function ()
{
    'use strict';

    angular
        .module('app.accessos')
        .controller('accessosController', accessosController);

    /** @ngInject */
  function accessosController($scope,$timeout,$state,workSpace,localStorageService,ws,sg,Notification,$mdDialog ){
        
        var entryViews = ws.allAccess().query({}, function() {
             $scope.usuarioData = entryViews;
                $timeout(function() {
        	        $scope.gridOptions.api.setColumnDefs($scope.columnDefs);
        	        $scope.gridOptions.api.setRowData($scope.usuarioData);
        	     }, 300);
        }, function(error) {
            workSpace.error = error.data.message; 
            $scope.Error();
        });

        $scope.sg = sg.callSg();
        if($scope.sg.accesos.activo){
            $state.go("app.home");
            Notification.error('No tienes Acceso a Accesos');
        }

         //*************************
        // GRID OPTION
        $scope.gridOptions = {
            enableColResize: true,
            rowSelection: 'single',
            rowDeselection: true,
            columnDefs: $scope.columnDefs,
        }; 

        $scope.showConfirm = function(ev) {
            var ob = $scope.gridOptions.api.getSelectedRows();
            if(ob.length>0){
              // Appending dialog to document.body to cover sidenav in docs app
              var confirm = $mdDialog.confirm()
                    .title('Seguro que desea Eliminar el Registro?')
                    .textContent('Se eliminara el registro selecto a continuacion')
                    .ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('Eliminar')
                    .cancel('Cancelar');

              $mdDialog.show(confirm).then(function() {
                 var entryViews = ws.allAccess().query({}, function() {
                         $scope.usuarioData = entryViews;
                         $scope.gridOptions.api.setRowData($scope.usuarioData);
                    }, function(error) {
                        workSpace.error = error.data.message; 
                        $scope.Error();
                    });
              }, function() {
                
              });
            }else{
              Notification.error('Selecciona un Registro Primero');
            }
      };

        $scope.columnDefs = [];

        $scope.columnDefs.push({ headerName: "Id", checkboxSelection: true,  field: "id", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Valor", field: "valor", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Tipo", field: "tipo", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Fecha Creacion", field: "fechaCreacion", filter: 'text', filterParams: { apply: true } });
        $scope.columnDefs.push({ headerName: "Creado Por", field: "creadoPor", filter: 'text', filterParams: { apply: true } });




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
