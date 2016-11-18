(function ()
{
    'use strict';

    angular
            .module('app.home.add')
            .controller('addHomeRolController', addHomeRolController);

    /** @ngInject */
    function addHomeRolController($scope, $timeout, $mdDialog, $state, workSpace,
            localStorageService,
            f, ws, ioStuSalud, ioIdioma, $http) {
        var vm = this;
        $scope.manualEnable = true;
        $scope.focus = false;
        $scope.paisCheckV = true;
        $scope.paisCheckV2 = true;

        $scope.img = '';
        $scope.txtMRZ2_1 = '';
        $scope.txtMRZ2_2 = '';
        $scope.huellaManoIzq = false;
        $scope.huellaManoDer = false;
        $scope.huellaDedoDer = '';
        $scope.huellaDedoIzq = '';
        $scope.chkRightThumb = false;
        $scope.chkRightIndex = false;
        $scope.chkRightMiddle = false;
        $scope.chkRightRing = false;
        $scope.chkRightLittle = false;
        $scope.paisSet = 'Pais';
        $scope.paisSetShow = true;
        $scope.deptoSet = 'Departamento';
        $scope.deptoSetShow = true;
        $scope.muniSet = 'Munucipio';
        $scope.muniSetShow = true;
        $scope.fchNacSet = 'Pais';
        $scope.fchNacShow = true;
        $scope.deptoVecSet = 'Departamento';
        $scope.deptoVecSetShow = true;
        $scope.muniVecSet = 'Munucipio';
        $scope.muniVecSetShow = true;
        $scope.deptoCedSet = 'Departamento';
        $scope.deptoCedSetShow = true;
        $scope.muniCedSet = 'Munucipio';
        $scope.muniCedSetShow = true;

        $scope.labelNivel1 = 'Distrito';
        $scope.labelNivel2 = 'Lugar Específico';
        $scope.labelNivel3 = 'Comunidad Lingüística';
        $scope.labelNivel4 = 'Nivel 4';

        $scope.labelNivel11 = 'Distrito';
        $scope.labelNivel22 = 'Lugar Específico';
        $scope.labelNivel33 = 'Comunidad Lingüística';
        $scope.labelNivel44 = 'Nivel 4';

        $scope.labelNivel13 = 'Distrito';
        $scope.labelNivel23 = 'Lugar Específico';
        $scope.labelNivel33 = 'Comunidad Lingüística';
        $scope.labelNivel43 = 'Nivel 4';



        // Data
        vm.formWizard = {};

        var update = false;
        var valor;


        //*************************
        //PAGE with 100%
        var myWidth = 0,
                myHeight = 0,
                newH;
        if (typeof (window.innerWidth) == 'number') {
            //No-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            //IE 6+
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }

        $scope.hh = myHeight - 310;

        $scope.showAlert = function (ev) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .parent(angular.element(document.body))
                    .title('Guardado')
                    .textContent('Usuario Guardado Con Exito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent(ev)
                    );
        };

        if (workSpace.user.id) {
            vm.basicForm.cui = workSpace.user.user;
        }

        $scope.manual = function () {
            $scope.manualEnable = false;
            f('cui');
        };

        $scope.counter = 0;
        $scope.persona = {};
        $scope.lector = function () {
            $scope.checkID();
            document.getElementById('my_iframe').src = "http://localhost:82/lector/launch.php?x=123&y=http://localhost:41825/sd-lector-events/pushProcessor";
        };
        $scope.checkID = function () {
            $http({
                method: 'GET',
                url: 'http://localhost:41825/sd-lector-events/events2?sessionid=123'
            }).then(function successCallback(response) {
                $scope.lecturaJson = response.data;
                $scope.cargarDatosLector();
                $timeout($scope.checkID, 2000);
            }, function errorCallback(response) {
                console.error(response);
                console.info("reintentando...");
                $timeout($scope.checkID, 2000);
            });
        };
        $scope.cargarDatosLector = function () {
            $scope.img = $scope.lecturaJson.lblPicture;
            $scope.manualEnable = true;
            vm.formWizard.cui = $scope.lecturaJson.txtCUI;
            vm.formWizard.primerNombre = $scope.lecturaJson.txtNombre1;
            vm.formWizard.segundoNombre = $scope.lecturaJson.txtNombre2;
            vm.formWizard.tercerNombre = $scope.lecturaJson.txtOtrosNombres;
            vm.formWizard.primerApellido = $scope.lecturaJson.txtApellido1;
            vm.formWizard.segundoApellido = $scope.lecturaJson.txtApellido2;
            vm.formWizard.tercerApellido = $scope.lecturaJson.txtApellido3;
            vm.formWizard.nserie = $scope.lecturaJson.txtNumSerie;
            vm.formWizard.profesion = $scope.lecturaJson.txtProfesion;
            vm.formWizard.limitacionesFisicas = $scope.lecturaJson.txtLimitaciones;
            vm.formWizard.oficialActivo = $scope.lecturaJson.chkOficialActivo;
            vm.formWizard.sabeLeer = $scope.lecturaJson.chkSabeLeer;
            vm.formWizard.sabeEscribir = $scope.lecturaJson.chkSabeEscribir;
            vm.formWizard.libro = $scope.lecturaJson.txtLibro;
            vm.formWizard.folio = $scope.lecturaJson.txtFolio;
            vm.formWizard.partida = $scope.lecturaJson.txtPartida;
            vm.formWizard.ncedula = $scope.lecturaJson.txtCedulaNumero;
            vm.formWizard.edad = '33';

            $scope.txtMRZ2_1 = $scope.lecturaJson.txtMRZ2_1;
            $scope.txtMRZ2_2 = $scope.lecturaJson.txtMRZ2_2;
            $scope.chkLeftThumb = $scope.lecturaJson.chkLeftThumb;
            $scope.chkLeftIndex = $scope.lecturaJson.chkLeftIndex;
            $scope.chkLeftMiddle = $scope.lecturaJson.chkLeftMiddle;
            $scope.chkLeftRing = $scope.lecturaJson.chkLeftRing;
            $scope.chkLeftLittle = $scope.lecturaJson.chkLeftLittle;
            $scope.chkRightThumb = $scope.lecturaJson.chkRightThumb;
            $scope.chkRightIndex = $scope.lecturaJson.chkRightIndex;
            $scope.chkRightMiddle = $scope.lecturaJson.chkRightMiddle;
            $scope.chkRightRing = $scope.lecturaJson.chkRightRing;
            $scope.chkRightLittle = $scope.lecturaJson.chkRightLittle;



            if ($scope.lecturaJson.txtGenero == "MASCULINO") {
                $scope.generoSet = {id: 'HOMBRE', name: 'Masculino'};
            } else {
                $scope.generoSet = {id: 'MUJER', name: 'Femenino'};
            }

            $scope.stadoCivilSet = $scope.lecturaJson.txtEstadoCivil;
            $scope.depto4Set = $scope.lecturaJson.txtVecDepto;
            $scope.muni4Set = $scope.lecturaJson.txtVecMunicipio;

            $scope.paisSet = $scope.lecturaJson.txtNacPais;
            $scope.paisSetShow = false;
            vm.formWizard.pais = $scope.lecturaJson.txtNacPais;

            $scope.deptoSet = $scope.lecturaJson.txtNacDepartamento;
            $scope.deptoSetShow = false;
            vm.formWizard.departamento = $scope.lecturaJson.txtNacDepartamento;

            $scope.muniSet = $scope.lecturaJson.txtNacMunicipio;
            $scope.muniSetShow = false;
            vm.formWizard.municipio = $scope.lecturaJson.txtNacMunicipio;

            $scope.fchNacSet = $scope.lecturaJson.txtFechaNacimiento;
            $scope.fchNacShow = false;
            vm.formWizard.fechaNacimiento = $scope.lecturaJson.txtFechaNacimiento;

            $scope.deptoVecSet = $scope.lecturaJson.txtNacDepartamento;
            $scope.deptoVecSetShow = false;
            vm.formWizard.departamentoVecindad = $scope.lecturaJson.txtNacDepartamento;

            $scope.muniVecSet = $scope.lecturaJson.txtNacMunicipio;
            $scope.muniVecSetShow = false;
            vm.formWizard.municipioVecindad = $scope.lecturaJson.txtNacMunicipio;

            $scope.deptoCedSet = $scope.lecturaJson.txtCedulaDepto;
            $scope.deptoCedSetShow = false;
            vm.formWizard.departamentoCedula = $scope.lecturaJson.txtCedulaDepto;

            $scope.muniCedSet = $scope.lecturaJson.txtCedulaMunicipio;
            $scope.muniCedSetShow = false;
            vm.formWizard.municipioCedula = $scope.lecturaJson.txtCedulaMunicipio;


            console.log(vm.formWizard.pais);


            if ($scope.lecturaJson.txtNacionalidad == "GUATEMALA") {
                $scope.nacionalidadSet = "guatemalteco(a)";
            }



        }





        $scope.fechaNacChange = function (id) {
            var y = new Date().getFullYear();
            var yAc = id.substring(6);
            vm.formWizard.edad = y - yAc;
            console.info($scope.edadCal);
        }

        $scope.save = function () {
            $state.go("app.roles");
            console.info(vm.basicForm.cui);
            $scope.showAlert();
        }


        $scope.genero = [{id: 'HOMBRE', name: 'HOMBRE'},
            {id: 'MUJER', name: 'MUJER'}
        ];

        $scope.stadoCivil = [{id: 'SOLTERO', name: 'SOLTERO (a)'},
            {id: 'CASADO', name: 'CASADO (a)'},
            {id: 'UNIDO', name: 'UNIDO (a)'}
        ];

        var entryViews = ws.pais().query({}, function () {
            $scope.pais = entryViews;
            $scope.pais2 = $scope.pais;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewscomLing = ws.comLing().query({}, function () {
            $scope.comLing = entryViewscomLing;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewsnacionalidad = ws.nacionalidad().query({}, function () {
            $scope.nacionalidad = entryViewsnacionalidad;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewsnivelEducativo = ws.nivelEducativo().query({}, function () {
            $scope.nivelEducativo = entryViewsnivelEducativo;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewsExpectativas = ws.expectativas().query({}, function () {
            $scope.expectativas = entryViewsExpectativas;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewsPuestoFuncional = ws.puestoFuncional().query({}, function () {
            $scope.puestoFuncional = entryViewsPuestoFuncional;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewsReglon = ws.reglon().query({}, function () {
            $scope.reglon = entryViewsReglon;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewsUnidadEjecutora = ws.unidadEjecutora().query({}, function () {
            $scope.unidadEjecutora = entryViewsUnidadEjecutora;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewsClasificacionSer = ws.clasificacionSer().query({}, function () {
            $scope.clasificaServicio = entryViewsClasificacionSer;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        var entryViewsDepto = ws.depto().query({}, function () {
            $scope.depto = entryViewsDepto;
            $scope.depto2 = $scope.depto;
            $scope.depto3 = $scope.depto;
            $scope.depto4 = $scope.depto;
        }, function (error) {
            workSpace.error = JSON.stringify(error.data);
            $scope.Error();
        });

        $scope.paisCheck = function () {
            if (vm.formWizard.pais == 74) {
                $scope.paisCheckV = false;
            } else {
                $scope.paisCheckV = true;
            }
        }

        $scope.paisCheck2 = function () {
            if (vm.formWizard.paisResidencia == 74) {
                $scope.paisCheckV2 = false;
            } else {
                $scope.paisCheckV2 = true;
            }
        }

        $scope.takeDepto = function (id) {
            var entryViewsMuni = ws.muni(id).query({}, function () {
                $scope.muni = entryViewsMuni;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeDepto2 = function (id) {
            var entryViewsMuni2 = ws.muni(id).query({}, function () {
                $scope.muni2 = entryViewsMuni2;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeDepto3 = function (id) {
            var entryViewsMuni3 = ws.muni(id).query({}, function () {
                $scope.muni3 = entryViewsMuni3;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeDepto4 = function (id) {
            var entryViewsMuni4 = ws.muni(id).query({}, function () {
                $scope.muni4 = entryViewsMuni4;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeNivelEducativo = function (id) {
            var entryViewsnivelEducativoPadre = ws.nivelEducativoPadre(id).query({}, function () {
                $scope.nivelEducativoPadre = entryViewsnivelEducativoPadre;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeNivelEducativo2 = function (id) {
            var entryViewsnivelEducativoPadre2 = ws.nivelEducativoPadre(id).query({}, function () {
                $scope.nivelEducativoPadre2 = entryViewsnivelEducativoPadre2;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeReglon = function (id) {
            var entryViewsPuestoNominal = ws.puestoNominal(id).query({}, function () {
                $scope.puestoNominal = entryViewsPuestoNominal;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeReglon2 = function (id) {
            var entryViewsPuestoNominal2 = ws.puestoNominal(id).query({}, function () {
                $scope.puestoNominal2 = entryViewsPuestoNominal2;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }


        $scope.takeCumnidadaDis1 = function (id) {
            var entryViewsComunidad = ws.comunidad2(id).query({}, function () {
                $scope.nivel4R = entryViewsComunidad;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeCumnidadaDis2 = function (id) {
            var entryViewsComunidad = ws.comunidad2(id).query({}, function () {
                $scope.nivel4RotroPuesto = entryViewsComunidad;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeUnidadEje = function (id) {
            if (id == 445) {
                $scope.labelNivel1 = 'Nivel 1';
                $scope.labelNivel2 = 'Nivel 2';
                $scope.labelNivel3 = 'Nivel 3';
                $scope.lavel4Si = true;
            } else {
                $scope.labelNivel1 = 'Distrito';
                $scope.labelNivel2 = 'Lugar Específico';
                $scope.labelNivel3 = 'Comunidad Lingüística';
                $scope.labelNivel4 = 'Nivel 4';
                $scope.lavel4Si = false;
            }
            var entryViewsDistrito = ws.distrito(id).query({}, function () {
                $scope.distrito = entryViewsDistrito;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeUnidadEje2 = function (id) {
            if (id == 445) {
                $scope.labelNivel11 = 'Nivel 1';
                $scope.labelNivel12 = 'Nivel 2';
            } else {
                $scope.labelNivel11 = 'Distrito';
                $scope.labelNivel22 = 'Lugar Específico';
            }
            var entryViewsDistrito2 = ws.distrito(id).query({}, function () {
                $scope.distrito2 = entryViewsDistrito2;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeUnidadEje3 = function (id) {
            if (id == 445) {
                $scope.labelNivel13 = 'Nivel 1';
                $scope.labelNivel23 = 'Nivel 2';
                $scope.labelNivel33 = 'Nivel 3';
                $scope.lavel4Si2 = true;
            } else {
                $scope.labelNivel13 = 'Distrito';
                $scope.labelNivel23 = 'Lugar Específico';
                $scope.labelNivel33 = 'Comunidad Lingüística';
                $scope.labelNivel43 = 'Nivel 4';
                $scope.lavel4Si2 = false;
            }
            var entryViewsDistrito3 = ws.distrito(id).query({}, function () {
                $scope.distrito3 = entryViewsDistrito3;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeDistrito = function (id) {
            var entryViewsLugarEspesifico = ws.lugarEspesifico(id).query({}, function () {
                $scope.lugarEspesifico = entryViewsLugarEspesifico;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeDistrito2 = function (id) {
            var entryViewsLugarEspesifico2 = ws.lugarEspesifico(id).query({}, function () {
                $scope.lugarEspesifico2 = entryViewsLugarEspesifico2;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeDistrito3 = function (id) {
            var entryViewsLugarEspesifico3 = ws.lugarEspesifico(id).query({}, function () {
                $scope.lugarEspesifico3 = entryViewsLugarEspesifico3;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeLugarE = function (id) {
            var entryViewsComunidad = ws.comunidad(id).query({}, function () {
                $scope.comunidad = entryViewsComunidad;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeLugarE2 = function (id) {
            var entryViewsComunidad2 = ws.comunidad(id).query({}, function () {
                $scope.comunidad2 = entryViewsComunidad2;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        $scope.takeClasificaSer = function (id) {
            var entryViewsClasificacionSerArea = ws.clasificacionSerArea(id).query({}, function () {
                $scope.clasificacionSerArea = entryViewsClasificacionSerArea;
            }, function (error) {
                workSpace.error = JSON.stringify(error.data);
                $scope.Error();
            });
        }

        //MULTI
        $scope.shopArr = ioStuSalud.query();
        $scope.bundle = [];

        //MULTI
        //MULTI
        $scope.shopArrID = ioIdioma.query();
        $scope.bundleID = [];

        //MULTI

        $scope.yearsA = [];
        var yy = new Date().getFullYear();
        for (var i = 1960; i <= yy; i++) {
            $scope.yearsA.push({id: i, name: i});
        }

        $scope.pp = function () {
            var recorte = '';
            var res;
            var recorteB;
            vm.formWizard.bundle.forEach(function (value, key) {
                if (value.id == vm.formWizard.studioSaludAdd) {
                    vm.formWizard.bundle[key].anioEstudio = vm.formWizard.studioSaludAddYear;
                    recorte = value.valor;
                    recorteB = value.valor.indexOf('(');
                    res = recorte.slice(0, recorteB);
                    console.info('DOM_ ', res);
                    vm.formWizard.bundle[key].valor = '';
                    vm.formWizard.bundle[key].valor = res + ' (' + vm.formWizard.studioSaludAddYear + ')';
                    vm.formWizard.bundle[key].fkEstudioSalud = vm.formWizard.bundle[key].id;
                }
            });
        }



        try {
            valor = localStorageService.get('workSpace').person;
            valor.cui ? update = true : update = false;
            vm.formWizard.cui = valor.cui;
            vm.formWizard.primerNombre = valor.primerNombre;
            vm.formWizard.segundoNombre = valor.segundoNombre;
            vm.formWizard.tercerNombre = valor.otrosNombres;
            vm.formWizard.primerApellido = valor.primerApellido;
            vm.formWizard.segundoApellido = valor.segundoApellido;
            vm.formWizard.tercerApellido = valor.otrosApellidos;
            vm.formWizard.nserie = '';
            vm.formWizard.profesion = valor.fkProfesion;
            vm.formWizard.limitacionesFisicas = valor.limitacionesFisicas;
            vm.formWizard.oficialActivo = false;
            vm.formWizard.sabeLeer = valor.sabeLeer;
            vm.formWizard.sabeEscribir = valor.sabeEscribir;
            vm.formWizard.libro = valor.nacNoLibro;
            vm.formWizard.folio = valor.nacNoFolio;
            vm.formWizard.partida = valor.nacNoPartida;
            vm.formWizard.ncedula = valor.noCedula;
            vm.formWizard.edad = valor.edad;
            vm.formWizard.fechaNacimiento = valor.fechaNacimiento;
            vm.formWizard.detalleResidencia = valor.lugarResidencia.direccion;
            vm.formWizard.fchCreacionDpi = valor.dpi.fechaEmision;
            vm.formWizard.nserie = valor.dpi.noSerie;
            vm.formWizard.fchVenceDpi = valor.dpi.fechaVencimiento;
            vm.formWizard.observaciones = valor.registroLaboral.observaciones;

            $scope.img = valor.foto;

            if (!$scope.img) {
                $scope.img = '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';
            }

            $scope.huellaManoIzq = valor.huellaManoIzq;
            $scope.huellaManoDer = valor.huellaManoDer;
            $scope.huellaDedoDer = valor.huellaDedoDer;
            $scope.huellaDedoIzq = valor.huellaDedoIzq;

            $scope.generoSet = valor.sexo;
            $scope.stadoCivilSet = valor.estadoCivil;
            $scope.nacionalidadSet = valor.fkNacionalidad;
            $scope.puebloSet = valor.fkPueblo;
            $scope.linSet = valor.fkComunidadLinguistica;

            $scope.txtMRZ2_1 = valor.mrz;

            $scope.pais2Set = valor.refCedula.fkPais;
            $scope.municipioCedulaSet = valor.refCedula.fkMunicio;
            $scope.depto3Set = valor.refCedula.fkDepartamento;

            $scope.depto4Set2 = valor.refVecindad.fkDepartamento;
            $scope.muni4Set = valor.refVecindad.fkMunicio;

            $scope.pais2Set = valor.lugarResidencia.refLugarResidencia.fkPais;
            $scope.takedeptoRec = valor.lugarResidencia.refLugarResidencia.fkDepartamento;

            $scope.takedeptoRec ? $scope.takeDepto2($scope.takedeptoRec) : '';
            $scope.takemuniRec = valor.lugarResidencia.refLugarResidencia.fkMunicio;

            $scope.paisSet2 = valor.refNacimiento.fkPais;
            $scope.deptoNac = valor.refNacimiento.fkDepartamento;
            $scope.depto44Set2 = valor.refNacimiento.fkDepartamento;
            $scope.municipioSet = valor.refNacimiento.fkMunicio;

            $scope.depto44Set2 ? $scope.takeDepto($scope.depto44Set2) : '';
            $scope.depto3Set ? $scope.takeDepto3($scope.depto3Set) : '';
            $scope.depto4Set2 ? $scope.takeDepto4($scope.depto4Set2) : '';

            $scope.tt = [];
            var h, j;
            valor.idiomas.forEach(function (value, key) {
                h = value.fkIdioma;
                j = value.nombre;
                $scope.tt.push({id: h, valor: j});
            });

            vm.formWizard.bundleID = $scope.tt;

            $scope.tt2 = [];
            var h2, j2, p3;
            valor.estudiosSalud.forEach(function (value, key) {
                h2 = value.fkEstudioSalud;
                j2 = value.nombre + '(' + value.anioEstudio + ')';
                p3 = value.fkEstudioSalud;
                $scope.tt2.push({id: h2, valor: j2, fkEstudioSalud: p3});
            });

            vm.formWizard.bundle = $scope.tt2;


            $scope.takeNivelEduca = valor.registroAcademico.nivelUltimoGrado;
            $scope.takeNivelEduca ? $scope.takeNivelEducativo($scope.takeNivelEduca) : '';
            $scope.takeNivelEducaPadre = valor.registroAcademico.ultimoGrado;
            $scope.takeGraUstuActual = valor.registroAcademico.nivelGradoActual;
            $scope.takeGraUstuActual ? $scope.takeNivelEducativo2($scope.takeGraUstuActual) : '';
            $scope.takenivelEduPrad2 = valor.registroAcademico.gradoActual;
            if (valor.registroAcademico.estudiaActualmente) {
                $scope.takeStudiaActual = "SI";
            } else {
                $scope.takeStudiaActual = "NO";
            }


            vm.formWizard.anioIngresoInstitucion = valor.registroLaboral.anioIngreso;
            $scope.takeExpta = valor.registroLaboral.fkExpectativa;
            if (valor.registroLaboral.comisionado) {
                $scope.takeCmis = "SI";
            } else {
                $scope.takeCmis = "NO";
            }

            var contaP = 0;
            valor.registroLaboral.puestos.forEach(function (value, key) {
                if (contaP == 0) {
                    $scope.takePuestoFunciona1 = valor.registroLaboral.puestos[key].fkPuestoFuncional;
                    $scope.takeRelon1 = valor.registroLaboral.puestos[key].fkPuestoNominalRenglon;
                    $scope.takeRelon1 ? $scope.takeReglon($scope.takeRelon1) : '';
                    $scope.takePuestoNominal1 = valor.registroLaboral.puestos[key].fkPuestoNominal;
                    $scope.takeClsServe1 = valor.registroLaboral.puestos[key].fkClasificacionServicio;
                    $scope.takeunidadEjecutora1 = valor.registroLaboral.puestos[key].refUnidadNotificadora.fkUnidadEjecutora;
                    $scope.takeunidadEjecutora1 ? $scope.takeUnidadEje($scope.takeunidadEjecutora1) : '';
                    $scope.takeDistrito1 = valor.registroLaboral.puestos[key].refUnidadNotificadora.fkDistrito;
                    $scope.takeDistrito1 ? $scope.takeDistrito($scope.takeDistrito1) : '';
                    $scope.takeLugarEspesific1 = valor.registroLaboral.puestos[key].refUnidadNotificadora.fkLugarEspecifico;
                    $scope.takeLugarEspesific1 ? $scope.takeLugarE($scope.takeLugarEspesific1) : '';
                    $scope.takeComunidad1 = valor.registroLaboral.puestos[key].refUnidadNotificadora.fkComunidad;
                    $scope.takeClasServ1 = valor.registroLaboral.puestos[key].refClasificacionServicio.fkClasificacionServicio;
                    $scope.takeClasServ1 ? $scope.takeClasificaSer($scope.takeClasServ1) : '';
                    $scope.takeAreaServ1 = valor.registroLaboral.puestos[key].refClasificacionServicio.fkAreaServicio;


                } else {
                    $scope.takeOtrop = "SI";
                    $scope.takePuestoFunciona2 = valor.registroLaboral.puestos[key].fkPuestoFuncional;
                    $scope.takeRelon22 = valor.registroLaboral.puestos[key].fkPuestoNominalRenglon;
                    $scope.takeRelon22 ? $scope.takeReglon2($scope.takeRelon22) : '';
                    $scope.takePuestoNominal2 = valor.registroLaboral.puestos[key].fkPuestoNominal;
                    $scope.takeunidadEjecutora2 = valor.registroLaboral.puestos[key].refUnidadNotificadora.fkUnidadEjecutora;
                    $scope.takeunidadEjecutora2 ? $scope.takeUnidadEje3($scope.takeunidadEjecutora2) : '';
                    $scope.takeDistrito22 = valor.registroLaboral.puestos[key].refUnidadNotificadora.fkDistrito;
                    $scope.takeDistrito22 ? $scope.takeDistrito3($scope.takeDistrito22) : '';
                    $scope.takeLugarEspesific22 = valor.registroLaboral.puestos[key].refUnidadNotificadora.fkLugarEspecifico;
                    $scope.takeLugarEspesific22 ? $scope.takeLugarE2($scope.takeLugarEspesific22) : '';
                    $scope.takeComunida22 = valor.registroLaboral.puestos[key].refUnidadNotificadora.fkComunidad;

                }
                contaP++;
            });


            $scope.manualEnable = false;

        } catch (e) {

        }



        $scope.pueblo = [
            {id: 'MESTIZO_O_LADINO', name: 'Mestizo o Ladino'},
            {id: 'MAYA', name: 'Maya'},
            {id: 'GARIFUNA', name: 'Garifuna'},
            {id: 'XINCA', name: 'Xinca'},
            {id: 'OTRO', name: 'Otro'},
            {id: 'NO_INDICA', name: 'No Inca'}

        ];


        $scope.escolaridad = [
            "PRIMARIA",
            "SECUNDARIA",
            "DIVERSIFICADO",
            "PREGRADO",
            "GRADO",
            "TECNICO",
            "POSGRADO",
            "DOCTORADO"
        ];

        $scope.si = [
            "SI",
            "NO"
        ];


        $scope.showEscolaridad = false;
        $scope.studiaVal = function () {
            if (vm.formWizard.estudiaActual == "SI") {
                $scope.showEscolaridad = true;
            } else {
                $scope.showEscolaridad = false;
            }
        }

        $scope.comisionadoSI = false;
        $scope.verComisionado = function () {
            if (vm.formWizard.esComisinado == "SI") {
                $scope.comisionadoSI = true;
            } else {
                $scope.comisionadoSI = false;
            }
        }

        $scope.otroPuestoSI = false;
        $scope.verOtroPuesto = function () {
            if (vm.formWizard.otroPuesto == "SI") {
                $scope.otroPuestoSI = true;
            } else {
                $scope.otroPuestoSI = false;
            }
        }


        $scope.showAlert = function (ev) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .parent(angular.element(document.body))
                    .title('Guardado')
                    .textContent('Usuario Guardado Con Exito')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Aceptar')
                    .targetEvent(ev)
                    );
        };

        $scope.sendForm = function () {
            var studiaAc;
            var comosionadoAc;
            if (vm.formWizard.estudiaActual == 'SI') {
                studiaAc = true;
            } else {
                studiaAc = false;
            }
            if (vm.formWizard.esComisinado == 'SI') {
                comosionadoAc = true;
            } else {
                comosionadoAc = false;
            }
            var ido = [];
            vm.formWizard.bundleID.forEach(function (value, key) {
                ido.push({fkIdioma: vm.formWizard.bundleID[key].id});
            });
            var salu = [];
            try {
                vm.formWizard.bundle.forEach(function (value, key) {
                    salu.push({fkEstudioSalud: vm.formWizard.bundle[key].id, anioEstudio: vm.formWizard.bundle[key].anioEstudio});
                });
            } catch (e) {
                salu.push({fkEstudioSalud: '', anioEstudio: ''});
            }


            var fkComunida;
            if (vm.formWizard.nivel4) {
                fkComunida = vm.formWizard.nivel4;
            } else if (vm.formWizard.comunidadDistrito) {
                fkComunida = vm.formWizard.comunidadDistrito;
            } else if (vm.formWizard.lugarEspesificoDistrito) {
                fkComunida = vm.formWizard.lugarEspesificoDistrito;
            } else {
                fkComunida = vm.formWizard.distrito;
            }

            var fkComunida2;
            if (vm.formWizard.nivel4otroPuesto) {
                fkComunida2 = vm.formWizard.nivel4otroPuesto;
            } else if (vm.formWizard.comunidadDistritootroPuesto) {
                fkComunida2 = vm.formWizard.comunidadDistritootroPuesto;
            } else if (vm.formWizard.lugarEspesificoDistritootroPuesto) {
                fkComunida2 = vm.formWizard.lugarEspesificoDistritootroPuesto;
            } else {
                fkComunida2 = vm.formWizard.distrito;
            }

            if (vm.formWizard.puestoFuncionalotroPuesto) {
                var puestosD = [
                    {
                        fkPuestoFuncional: vm.formWizard.puestoFuncional,
                        tipo: 'PRINCIPAL',
                        fkPuestoNominal: vm.formWizard.puestoNominal,
                        fkComunidad: fkComunida,
                        fkClasificacionServicio: vm.formWizard.AreaclasificaServicio
                    },
                    {
                        fkPuestoFuncional: vm.formWizard.puestoFuncionalotroPuesto,
                        tipo: 'ADICIONAL',
                        fkPuestoNominal: vm.formWizard.puestoNominalotroPuesto,
                        fkComunidad: fkComunida2,
                        fkClasificacionServicio: vm.formWizard.AreaclasificaServicio
                    }
                ];
            } else {
                var puestosD = [
                    {
                        fkPuestoFuncional: vm.formWizard.puestoFuncional,
                        tipo: 'PRINCIPAL',
                        fkPuestoNominal: vm.formWizard.puestoNominal,
                        fkComunidad: vm.formWizard.comunidadDistrito,
                        fkClasificacionServicio: vm.formWizard.AreaclasificaServicio
                    }
                ];
            }

            if ($scope.txtMRZ2_1) {
                var sendJSON = {
                    "cui": vm.formWizard.cui,
                    "primerNombre": vm.formWizard.primerNombre,
                    "segundoNombre": vm.formWizard.segundoNombre,
                    "otrosNombres": vm.formWizard.tercerNombre,
                    "primerApellido": vm.formWizard.primerApellido,
                    "segundoApellido": vm.formWizard.segundoApellido,
                    "otrosApellidos": vm.formWizard.tercerApellido,
                    "fkNacionalidad": vm.formWizard.nacionalidad,
                    "fkProfesion": vm.formWizard.profesion,
                    "limitacionesFisicas": vm.formWizard.limitacionesFisicas,
                    "sabeLeer": vm.formWizard.sabeLeer ? vm.formWizard.sabeLeer : 'false',
                    "sabeEscribir": vm.formWizard.sabeEscribir ? vm.formWizard.sabeEscribir : 'false',
                    "fechaNacimientoTexto": vm.formWizard.fechaNacimiento,
                    "fkMunicipioNacimientoNombre": vm.formWizard.municipio,
                    "nacNoLibro": vm.formWizard.libro,
                    "nacNoFolio": vm.formWizard.folio,
                    "nacNoPartida": vm.formWizard.partida,
                    "fkPueblo": vm.formWizard.pueblo,
                    "fkComunidadLinguistica": vm.formWizard.comunidadLinguistica,
                    "mrz": "<<<sdfsdf<<<sdfsdfd<<<",
                    "noCedula": vm.formWizard.ncedula,
                    "fkMunicipioCedulaNombre": vm.formWizard.municipioCedula,
                    "fkMunicipioVecindadNombre": vm.formWizard.municipioVecindad,
                    "huellaManoDer": $scope.chkRightThumb,
                    "huellaManoIzq": $scope.chkLeftThumb,
                    "huellaDedoDer": "indice",
                    "huellaDedoIzq": "medio",
                    "estadoCivil": vm.formWizard.estadoCivil,
                    "sexo": vm.formWizard.sexo,
                    "registroLaboral": {
                        "anioIngreso": vm.formWizard.anioIngresoInstitucion,
                        "comisionado": comosionadoAc,
                        "fkExpectativa": vm.formWizard.expectativas,
                        "puestos": puestosD,
                        "observaciones": vm.formWizard.observaciones
                    },
                    "registroAcademico": {
                        "ultimoGrado": vm.formWizard.gradoEstudia,
                        "gradoActual": vm.formWizard.gradoEstudia2,
                        "estudiaActualmente": studiaAc
                    },
                    "lugarResidencia": {
                        "fkMunicipio": vm.formWizard.municipioResidencia,
                        "direccion": vm.formWizard.detalleResidencia
                    },
                    "idiomas": ido,
                    "dpi": {
                        "noSerie": 112323123,
                        "fechaEmision": "12-12-2012",
                        "fechaVencimiento": "12-12-2012"
                    },
                    "estudiosSalud": salu
                };
            } else {
                var sendJSON = {
                    "cui": vm.formWizard.cui,
                    "primerNombre": vm.formWizard.primerNombre,
                    "segundoNombre": vm.formWizard.segundoNombre,
                    "otrosNombres": vm.formWizard.tercerNombre,
                    "primerApellido": vm.formWizard.primerApellido,
                    "segundoApellido": vm.formWizard.segundoApellido,
                    "otrosApellidos": vm.formWizard.tercerApellido,
                    "fkNacionalidad": vm.formWizard.nacionalidad,
                    "fkProfesion": 1,
                    "limitacionesFisicas": vm.formWizard.limitacionesFisicas,
                    "sabeLeer": vm.formWizard.sabeLeer ? vm.formWizard.sabeLeer : 'false',
                    "sabeEscribir": vm.formWizard.sabeEscribir ? vm.formWizard.sabeEscribir : 'false',
                    "fechaNacimiento": vm.formWizard.fechaNacimiento,
                    "fkMunicipioNacimiento": vm.formWizard.municipio,
                    "nacNoLibro": vm.formWizard.libro,
                    "nacNoFolio": vm.formWizard.folio,
                    "nacNoPartida": vm.formWizard.partida,
                    "fkPueblo": vm.formWizard.pueblo,
                    "fkComunidadLinguistica": vm.formWizard.comunidadLinguistica,
                    "mrz": "<<<sdfsdf<<<sdfsdfd<<<",
                    "noCedula": vm.formWizard.ncedula,
                    "fkMunicipioCedula": vm.formWizard.municipioCedula,
                    "fkMunicipioVecindad": vm.formWizard.municipioVecindad,
                    "huellaManoDer": true,
                    "huellaManoIzq": true,
                    "huellaDedoDer": "indice",
                    "huellaDedoIzq": "medio",
                    "estadoCivil": vm.formWizard.estadoCivil,
                    "sexo": vm.formWizard.sexo,
                    "registroLaboral": {
                        "anioIngreso": vm.formWizard.anioIngresoInstitucion,
                        "comisionado": comosionadoAc,
                        "fkExpectativa": vm.formWizard.expectativas,
                        "puestos": puestosD,
                        "observaciones": vm.formWizard.observaciones
                    },
                    "registroAcademico": {
                        "ultimoGrado": vm.formWizard.gradoEstudia,
                        "gradoActual": vm.formWizard.gradoEstudia2,
                        "estudiaActualmente": studiaAc
                    },
                    "lugarResidencia": {
                        "fkMunicipio": vm.formWizard.municipioResidencia,
                        "direccion": vm.formWizard.detalleResidencia
                    },
                    "idiomas": ido,
                    "dpi": {
                        "noSerie": 112323123,
                        "fechaEmision": "12-12-2012",
                        "fechaVencimiento": "12-12-2012"
                    },
                    "estudiosSalud": salu
                };
            }

            if (update) {
                var sendJSON = {
                    "primerNombre": vm.formWizard.primerNombre,
                    "segundoNombre": vm.formWizard.segundoNombre,
                    "otrosNombres": vm.formWizard.tercerNombre,
                    "primerApellido": vm.formWizard.primerApellido,
                    "segundoApellido": vm.formWizard.segundoApellido,
                    "otrosApellidos": vm.formWizard.tercerApellido,
                    "fkNacionalidad": vm.formWizard.nacionalidad,
                    "fkProfesion": vm.formWizard.profesion,
                    "limitacionesFisicas": vm.formWizard.limitacionesFisicas,
                    "sabeLeer": vm.formWizard.sabeLeer ? vm.formWizard.sabeLeer : 'false',
                    "sabeEscribir": vm.formWizard.sabeEscribir ? vm.formWizard.sabeEscribir : 'false',
                    "fechaNacimiento": vm.formWizard.fechaNacimiento,
                    "fkMunicipioNacimiento": vm.formWizard.municipio,
                    "nacNoLibro": vm.formWizard.libro,
                    "nacNoFolio": vm.formWizard.folio,
                    "nacNoPartida": vm.formWizard.partida,
                    "fkPueblo": vm.formWizard.pueblo,
                    "fkComunidadLinguistica": vm.formWizard.comunidadLinguistica,
                    "mrz": $scope.txtMRZ2_1,
                    "noCedula": vm.formWizard.ncedula,
                    "fkMunicipioCedula": vm.formWizard.municipioCedula,
                    "fkMunicipioVecindad": vm.formWizard.municipioVecindad,
                    "huellaManoDer": $scope.huellaManoDer,
                    "huellaManoIzq": $scope.huellaManoIzq,
                    "huellaDedoDer": $scope.huellaDedoDer,
                    "huellaDedoIzq": $scope.huellaDedoIzq,
                    "estadoCivil": vm.formWizard.estadoCivil,
                    "sexo": vm.formWizard.sexo,
                    "registroLaboral": {
                        "anioIngreso": vm.formWizard.anioIngresoInstitucion,
                        "comisionado": comosionadoAc,
                        "fkComunidadComisionado": '1',
                        "fkExpectativa": vm.formWizard.expectativas,
                        "puestos": puestosD,
                        "observaciones": vm.formWizard.observaciones
                    },
                    "registroAcademico": {
                        "ultimoGrado": vm.formWizard.gradoEstudia,
                        "gradoActual": vm.formWizard.gradoEstudia2,
                        "estudiaActualmente": studiaAc
                    },
                    "lugarResidencia": {
                        "fkMunicipio": vm.formWizard.municipioResidencia,
                        "direccion": vm.formWizard.detalleResidencia
                    },
                    "idiomas": ido,
                    "dpi": {
                        "noSerie": 112323123,
                        "fechaEmision": "12-12-2012",
                        "fechaVencimiento": "12-12-2012"
                    },
                    "estudiosSalud": salu
                };
            }



            if (update) {
                $scope.entryUp = ws.UpdatePersonas(vm.formWizard.cui);
                var EntryUp = $scope.entryUp.update(sendJSON, function () {
                    $scope.showAlert();
                    $state.go("app.home");
                }, function (error) {
                    workSpace.error = JSON.stringify(error.data);
                    $scope.Error();
                });
            } else {
                $scope.entry = ws.saveHome();
                var entry = $scope.entry.save(sendJSON, function () {
                    $scope.showAlert();
                    $state.go("app.home");
                }, function (error) {
                    workSpace.error = JSON.stringify(error.data);
                    $scope.Error();
                });
            }
            console.info(JSON.stringify(sendJSON));
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

