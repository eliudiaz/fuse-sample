(function ()
{
    'use strict';

    angular
        .module('app.home')
        .controller('homeController', homeController);

    /** @ngInject */
    function homeController($scope,$state,$timeout,$mdDialog,workSpace,localStorageService,ws){
       var vm = this;

       vm.basicForm = {};
       vm.basicForm2 = {};


 

      $scope.showReglon2 = false;
      $scope.showanioIngreso2 = false;

   
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
        $scope.showNormal= true;
        var id = '#frmN';
        $(id).addClass("openNav");
      }
      $scope.showDinamicoF =  function(){
        $scope.showDinamico = true;
        var id = '#frmD';
        $(id).addClass("openNav");
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

     

      $scope.columnDefs.push({ headerName: "Cui", field: "cui", filter: 'text', filterParams: { apply: true } });
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
    });

var entryViewsReglon = ws.reglon().query({}, function() {
         $scope.reglon = entryViewsReglon;
    });


var entryViewsDepto = ws.depto().query({}, function() {
         $scope.depto3 = entryViewsDepto;
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
    var obj = {
         cui:vm.basicForm.cui,
         edad: vm.basicForm.edad,
         primerNombre:vm.basicForm.primerNombre ,
         segundoNombre:vm.basicForm.segundoNombre,
         primerApellido:vm.basicForm.primerApellido ,
         segundoApellido:vm.basicForm.segundoApellido ,
         sexo:vm.basicForm.sexo,
         fechaNacInicio:vm.basicForm.n,
         fechaNacFin:vm.basicForm.n,
         departamento:vm.basicForm.departamento,
         municipio:vm.basicForm.municipio,
         direccion:vm.basicForm.direccion,
         pueblo:vm.basicForm.pueblo
    };

    $scope.entryUp = ws.searchPersona();
    var EntryUp = $scope.entryUp.post(obj, function() {
        $scope.gridOptions.api.setRowData(EntryUp);
    }, function(error) {
        
    });


  }

  $scope.schNormalCui = function(){
    var obj = {
         cui:vm.basicForm.search
    };

    $scope.entryUp = ws.searchPersona();
    var EntryUp = $scope.entryUp.post(obj, function() {
        $scope.gridOptions.api.setRowData(EntryUp);
    }, function(error) {
        
    });


  }

   $scope.schDinamic = function(){

    $scope.entryUp2 = ws.searchPersonaAvs();
    var EntryUp2 = $scope.entryUp2.post($scope.searchObjDinamico, function() {
        $scope.gridOptions.api.setRowData(EntryUp2);
    }, function(error) {
        
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
      });
      
    }else{
      $scope.showAlert(); 
    }
    
  }

}
})();
