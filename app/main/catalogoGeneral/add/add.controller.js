(function ()
{
    'use strict';

    angular
        .module('app.catalogoGeneral.add')
        .controller('addController', addController);

    /** @ngInject */
  function addController($scope,$timeout,$mdDialog,$state,workSpace,localStorageService,ws,Notification){
        var vm = this;

        // Data
        vm.basicForm = {};
        var update = false;
        var valor; 
        
        try {
            valor = localStorageService.get('workSpace').catalogoGeneral.id;
        } catch (e) {

        }

         $scope.cancelar = function(){
            $state.go("app.catalogoGeneral");
            Notification.warning('Haz Cancelado la Operacion');
        }

        if(valor){
            console.info(localStorageService.get('workSpace').catalogoGeneral);
            vm.basicForm.tipo = {id:localStorageService.get('workSpace').catalogoGeneral.tipo,name:localStorageService.get('workSpace').catalogoGeneral.tipo};
            vm.basicForm.valor = localStorageService.get('workSpace').catalogoGeneral.valor;
            vm.basicForm.estado = {id:localStorageService.get('workSpace').catalogoGeneral.estado,name:localStorageService.get('workSpace').catalogoGeneral.estado};
            vm.basicForm.codigoPadre = {id:localStorageService.get('workSpace').catalogoGeneral.codigoPadre,name:localStorageService.get('workSpace').catalogoGeneral.codigoPadre};
            update = true;
        }

        
        $scope.getAllEstado = [{id:'ACTIVO',name:'ACTIVO'},{id:'INACTIVO',name:'INACTIVO'}];
        $scope.getAllType = [{id:'IDIOMA',name:'IDIOMA'},{id:'NIVEL_EDUCATIVO',name:'NIVEL_EDUCATIVO'},{id:'EXPECTATIVAS',name:'EXPECTATIVAS'}
        ,{id:'NIVEL_EDUCATIVO_CARRERA',name:'NIVEL_EDUCATIVO_CARRERA'}
        ,{id:'PUESTO_FUNCIONAL',name:'PUESTO_FUNCIONAL'},{id:'CLASIFICACION_SERVICIO',name:'CLASIFICACION_SERVICIO'}
        ,{id:'ESTUDIO_SALUD',name:'ESTUDIO_SALUD'},{id:'CLASIFICACION_SERVICIO_AREA',name:'CLASIFICACION_SERVICIO_AREA'}
        ,{id:'NIVEL_EDUCATIVO_GRADO',name:'NIVEL_EDUCATIVO_GRADO'},{id:'NACIONALIDAD',name:'NACIONALIDAD'}
        ,{id:'COMUNIDAD_LING',name:'COMUNIDAD_LING'}];
        
        var entryViewsnivelEducativo = ws.allCatalogoG().query({}, function () {
            $scope.nivelEducativo = [];
            $scope.nivelEducativo.push({id: null, valor: 'No aplica'});
            entryViewsnivelEducativo.forEach(function (value, key) {
                $scope.nivelEducativo.push({id: value.id, valor: value.valor});
            });
        }, function (error) {
            workSpace.error = error.data;
            $scope.Error();
        });



        $scope.showAlert = function(ev) {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .title('Guardado')
                .textContent('Acceso Guardado Con Exito')
                .ariaLabel('Alert Dialog Demo')
                .ok('Aceptar')
                .targetEvent(ev)
            );
          }; 

        if(workSpace.user.id){
            vm.basicForm.cui = workSpace.user.user;
        }

        $scope.departamento ={
          "base":[{id:1,nombre:'rol 1'}]
        };



        $scope.save = function(){
            var obj = {
              "valor":vm.basicForm.valor,
              "tipo":vm.basicForm.tipo.id,
              "codigoPadre":vm.basicForm.padre.id,
              "estado":vm.basicForm.estado.id
            };

            if(update){
                $scope.entryUp = ws.UpdateCatalogoG(valor);
                var EntryUp = $scope.entryUp.update(obj, function() {
                    $scope.showAlert(); 
                    $state.go("app.catalogoGeneral");
                }, function(error) {
                     workSpace.error = error.data.message; 
                     $scope.Error();
                });
            }else{
                $scope.entry = ws.saveCatalogoG();
                var entry = $scope.entry.save(obj, function() {
                    $scope.showAlert(); 
                    $state.go("app.catalogoGeneral");
                }, function(error) { 
                     workSpace.error = error.data.message; 
                     $scope.Error(); 
                } 
                );    
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

