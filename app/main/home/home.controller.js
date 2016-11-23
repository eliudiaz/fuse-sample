(function ()
{
    'use strict';

    angular
        .module('app.home')
        .controller('homeController', homeController);

    /** @ngInject */
    function homeController($scope,$state,$timeout,$mdDialog,workSpace,localStorageService,ws,sg,Notification){
       var vm = this;

       vm.basicForm = {};
       vm.basicForm2 = {};

      $scope.arySearchTake = {obj:'',api:'http://45.79.200.203:8080/MS_RRHH_Servicios/personas/todos'};  

      $scope.showReglon2 = false;
      $scope.showanioIngreso2 = false;

      $scope.sg = sg.callSg();
   
        //*************************
        // GRID OPTION
        $scope.gridOptions = {
            enableColResize: true,
            rowSelection: 'single',
            rowDeselection: true,
            columnDefs: $scope.columnDefs,
        };  

      $scope.rows = [];
      $scope.columnDefs = [];

      $scope.showOpcionesF =  function(){
        $scope.showDinamico = false;
        $scope.showNormal= true;
        var id = '#frmN';
        $(id).addClass("openNav");
      }
      $scope.showDinamicoF =  function(){
        $scope.showDinamico = true;
        $scope.showNormal= false;
        var id = '#frmD';
        $(id).addClass("openNav");
      }


      $scope.excel = function () {
            //ESTA VARIABLE CONTIENE EL API Y LAS VARIABLES QE NECESITA PARA EJECUTARSE 
            // SEGUN LA ULTIMA ACTIVIDADA BUSQUEDA NORMAL,AVANZADA O CUI TODO QUEDA REGUISTRADO
            console.info('Ultima Busqueda Generada',$scope.arySearchTake);
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
            console.info('EEE');
               var entryViewsAll = ws.allPersonas().query({}, function() {
                   $scope.gridOptions.api.setRowData(entryViewsAll);
                 }, function(error) {
                    workSpace.error = JSON.stringify(error.data); 
                    $scope.Error();
                });       
          }, function() {   });
        }else{
          Notification.error('Selecciona un Registro Primero');
        }
      };


      $scope.clear = function(){
        vm.basicForm.primerNombre = null;
        vm.basicForm.segundoNombre = null;
        vm.basicForm.edad = null;
        vm.basicForm.primerApellido = null;
        vm.basicForm.segundoApellido = null;
        vm.basicForm.sexo = null;
        vm.basicForm.departamento = null;
        vm.basicForm.municipio = null;
        vm.basicForm.pueblo = null;
        vm.basicForm.direccion = null;

        vm.basicForm2.objSearchDinamico = null;
        vm.basicForm2.filtroReglon = null;
        vm.basicForm2.inputFiltroReglon = null;
        vm.basicForm2.input2FiltroReglon = null;
        vm.basicForm.fechaDesde = null;
        vm.basicForm.fechaHasta = null;

        $scope.searchObjDinamico.filtros = [];

        var entryViewsAll = ws.allPersonas().query({}, function() {
           $scope.gridOptions.api.setRowData(entryViewsAll);
         }, function(error) {
            workSpace.error = JSON.stringify(error.data); 
            $scope.Error();
        });
      }
     

      $scope.betweenOK = function(id){
        if(id==1){
          if(vm.basicForm2.filtroReglon=="ENTRE"){
            $scope.showReglon2 = true;
          }else{
            $scope.showReglon2 = false;
          }
        }else{
          if(vm.basicForm2.filtroanioIngreso=="ENTRE"){
            $scope.showanioIngreso2 = true;
          }else{
            $scope.showanioIngreso2 = false;
          }
        }
          
      }

     

      $scope.columnDefs.push({ headerName: "Cui", checkboxSelection: true, field: "cui", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Primer Nombre", field: "primerNombre", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Segundo nombre", field: "segundoNombre", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Primer apellido", field: "primerApellido", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Segundo apellido", field: "segundoApellido", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Apellido de Casado", field: "otrosApellidos", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Sexo", field: "sexo", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Estado civil", field: "estadoCivil", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Limitaciones fisicas", field: "limitacionesFisicas", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Sabe leer", field: "sabeLeer", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Sabe escribir", field: "sabeEscribir", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Fecha Nacimiento", field: "fechaNacimiento", filter: 'text', filterParams: { apply: true } });
      $scope.columnDefs.push({ headerName: "Edad", field: "edad", filter: 'text', filterParams: { apply: true } });
      
      $timeout(function() {
        $scope.gridOptions.api.setColumnDefs($scope.columnDefs);
        
        var entryViewsAll = ws.allPersonas().query({}, function() {
           $scope.gridOptions.api.setRowData(entryViewsAll);
         }, function(error) {
            workSpace.error = JSON.stringify(error.data); 
            $scope.Error();
        });


      }, 300);


      $scope.callApi = function(){
         // HERE CALL API
        
       
      }


 $scope.pueblo = [
        {id:'MESTIZO_O_LADINO',name:'Mestizo o Ladino'},
        {id:'MAYA',name:'Maya'},
        {id:'GARIFUNA',name:'Garifuna'},
        {id:'XINCA',name:'Xinca'},
        {id:'OTRO',name:'Otro'},
        {id:'NO_INDICA',name:'No Inca'}

    ];


  $scope.objSearchDinamico = [
    {id:'REGLON',name:'Reglon'},
    {id:'UNIDAD_EJECUTORA',name:'Unidad Ejecutora'},
    {id:'PUESTO_NOMINAL',name:'Puesto Nominal'},
    {id:'CLASIFICACION_SERVICIO',name:'Clasificacion Servicio'},
    {id:'ANIO_INGRESO',name:'Año Ingreso'}
  ]

  $scope.filtroDData = [];

  $scope.takeObcD = function(id){
    switch(id) {
        case "REGLON":
        case "ANIO_INGRESO":
          $scope.filtroDData = [{id:"MAYOR",name:"MAYOR"},{id:"MENOR",name:"MENOR"},{id:"IGUAL",name:"IGUAL"},{id:"ENTRE",name:"ENTRE"}];
            break;
        case "UNIDAD_EJECUTORA":
        case "PUESTO_NOMINAL":
        case "CLASIFICACION_SERVICIO":
            $scope.filtroDData = [{id:'IGUAL',name:'IGUAL'},{id:'DIFERENTE',name:'DIFERENTE'}];
            break;
    }
  }

  $scope.searchObjDinamico = {
    filtros:[]
  };

  $scope.out = function(id){
    $scope.searchObjDinamico.filtros.splice(id,1);
  }

  $scope.addDinamico = function(){
    switch(vm.basicForm2.objSearchDinamico) {
        case "REGLON":
        case "ANIO_INGRESO":
          if(vm.basicForm2.objSearchDinamico && vm.basicForm2.filtroReglon && vm.basicForm2.inputFiltroReglon){
           if(vm.basicForm2.filtroReglon == 'ENTRE'){
            if(vm.basicForm2.input2FiltroReglon){
              $scope.searchObjDinamico.filtros.push({campo:vm.basicForm2.objSearchDinamico,comparador:vm.basicForm2.filtroReglon,valor1:vm.basicForm2.inputFiltroReglon,valor2:vm.basicForm2.input2FiltroReglon});
            }
           }else{
              $scope.searchObjDinamico.filtros.push({campo:vm.basicForm2.objSearchDinamico,comparador:vm.basicForm2.filtroReglon,valor1:vm.basicForm2.inputFiltroReglon,valor2:vm.basicForm2.input2FiltroReglon});
            }
          }
            break;
        case "UNIDAD_EJECUTORA":
        case "PUESTO_NOMINAL":
        case "CLASIFICACION_SERVICIO":
          if(vm.basicForm2.objSearchDinamico && vm.basicForm2.filtroReglon && vm.basicForm2.inputFiltroReglon){
            $scope.searchObjDinamico.filtros.push({campo:vm.basicForm2.objSearchDinamico,comparador:vm.basicForm2.filtroReglon,valor1:vm.basicForm2.inputFiltroReglon});            
          }
            break;
    } console.info(JSON.stringify($scope.searchObjDinamico));
  }


$scope.genero = [{id:'HOMBRE',name:'HOMBRE'},
        {id:'MUJER',name:'MUJER'}
    ];

var entryViewsPuestoFuncional = ws.puestoFuncional().query({}, function() {
         $scope.puestoFuncional = entryViewsPuestoFuncional;
    }, function(error) {
            workSpace.error = JSON.stringify(error.data); 
            $scope.Error();
        });

var entryViewsReglon = ws.reglon().query({}, function() {
         $scope.reglon = entryViewsReglon;
    }, function(error) {
            workSpace.error = JSON.stringify(error.data); 
            $scope.Error();
        });


var entryViewsDepto = ws.depto().query({}, function() {
         $scope.depto3 = entryViewsDepto;
}, function(error) {
            workSpace.error = JSON.stringify(error.data); 
            $scope.Error();
        });


$scope.takeDepto3 = function(id){
    var entryViewsMuni3 = ws.muni(id).query({}, function() {
         $scope.muni3 = entryViewsMuni3;
    });
}


	$scope.takeDepto = function(id){
        console.info('ASDF_',id);
		for(var i in $scope.deptoMuni) {
		    if(i==id){
		    	$scope.municipios = $scope.deptoMuni[id];
		    }
		}
	}

  $scope.closeNave = function(id){
     id = '#'+id;
     if(id=='#frmD'){
        $scope.showDinamico = false;
     }else{
        $scope.showNormal= false;
     }
     $(id).removeClass("openNav");
  }

  $scope.schNormal = function(){
    if(vm.basicForm.edad>0){
    var obj = {
         cui: vm.basicForm.cui ? vm.basicForm.cui : null,
         edad: vm.basicForm.edad ? vm.basicForm.edad : null,
         primerNombre:vm.basicForm.primerNombre ? vm.basicForm.primerNombre : null ,
         segundoNombre:vm.basicForm.segundoNombre ? vm.basicForm.segundoNombre : null,
         primerApellido:vm.basicForm.primerApellido ? vm.basicForm.primerApellido : null ,
         segundoApellido:vm.basicForm.segundoApellido ? vm.basicForm.segundoApellido : null ,
         sexo:vm.basicForm.sexo ? vm.basicForm.sexo : null,
         fechaNacInicio:vm.basicForm.fechaDesde ? vm.basicForm.fechaDesde : null,
         fechaNacFin:vm.basicForm.fechaHasta ? vm.basicForm.fechaHasta : null,
         departamento:vm.basicForm.departamento ? vm.basicForm.departamento : null,
         municipio:vm.basicForm.municipio ? vm.basicForm.municipio : null,
         direccion:vm.basicForm.direccion ? vm.basicForm.direccion : null,
         pueblo:vm.basicForm.pueblo ? vm.basicForm.pueblo : null
    };

    $scope.arySearchTake = {obj: obj,api:'http://45.79.200.203:8080/MS_RRHH_Servicios/home/busquedaNormal'};  

    $scope.entryUp = ws.searchPersona();
    var EntryUp = $scope.entryUp.post(obj, function() {
        $scope.gridOptions.api.setRowData(EntryUp);
    }, function(error) {
        workSpace.error = JSON.stringify(error.data); 
        $scope.Error();
    });
  }

  }

  $scope.schNormalCui = function(){
    var obj = {
         cui:vm.basicForm.search
    };

    $scope.arySearchTake = {obj: obj,api:'http://45.79.200.203:8080/MS_RRHH_Servicios/home/busquedaNormal'};  

    $scope.entryUp = ws.searchPersona();
    var EntryUp = $scope.entryUp.post(obj, function() {
        $scope.gridOptions.api.setRowData(EntryUp);
    }, function(error) {
        workSpace.error = JSON.stringify(error.data); 
        $scope.Error();
    });


  }

   $scope.schDinamic = function(){

    $scope.entryUp2 = ws.searchPersonaAvs();
    
    $scope.arySearchTake = {obj: $scope.searchObjDinamico,api:'http://45.79.200.203:8080/MS_RRHH_Servicios/home/busquedaAvanzada'};  

    var EntryUp2 = $scope.entryUp2.post($scope.searchObjDinamico, function() {
        $scope.gridOptions.api.setRowData(EntryUp2);
    }, function(error) {
        workSpace.error = JSON.stringify(error.data); 
        $scope.Error();
    });


  }

  $scope.add = function(){
    workSpace.person = {};
    localStorageService.set('workSpace', workSpace);
    $state.go("app.home_add");
  }

   $scope.showAlert = function(ev) {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .parent(angular.element(document.body))
                .title('Error')
                .textContent('Selecciona un registro a modificar')
                .ariaLabel('Alert Dialog Demo')
                .ok('Aceptar')
                .targetEvent(ev)
            );
          };


  $scope.edit = function(){
    var ob = $scope.gridOptions.api.getSelectedRows();
    var per;
    if(ob.length>0){
      var entryViewsAll = ws.getPersona(ob[0].cui).get({}, function() {
          per = entryViewsAll;
          workSpace.person = per;
          localStorageService.set('workSpace', workSpace);
          $state.go("app.home_add");
        
          console.info(JSON.stringify(ob));
      }, function(error) {
            workSpace.error = JSON.stringify(error.data); 
            $scope.Error();
        });
      
    }else{
      $scope.showAlert(); 
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
