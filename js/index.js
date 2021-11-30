const regiones = [   //ARRAY DE REGIONES Y PROVINCIAS
    {nombre:'Noreste',
    provincias: ['Corrientes', 'Entre Ríos', 'Chaco', 'Misiones', 'Formosa'],
    },
    {nombre:'Cuyo',
    provincias: ['Mendoza', 'San Juan', 'San Luis','La Rioja'],
    },
    {nombre:'Noroeste',
    provincias: ['Salta', 'Tucumán', 'Jujuy', 'Catamarca', 'Santiago del Estero'],
    },
    {nombre:'Patagónica',
    provincias: ['Río Negro', 'Santa Cruz', 'Chubut', 'Neuquén', 'Tierra del Fuego, Antártida e Islas del Atlántico Sur'],
    },
    {nombre:'Pampeana',
    provincias: ['Buenos Aires', 'Córdoba', 'La Pampa','Entre Ríos', 'Santa Fe','Ciudad Autónoma de Buenos Aires'],
    }
]
//       CREACION DE LISTA DE MARCAS EN JS E INSERCION EN HTML
const marcasVehiculos = ['Volswagen', 'Peugeot', 'Ford', 'Chevrolet', 'Nissan', 'Fiat', 'Renault', 'Audi','Alfa Romeo','BMW','Honda', 'Hyundai', 'Toyota', 'Volvo'];

let usuarios = JSON.parse(localStorage.getItem('cliente'))||[];
let resulta=[];
let listaNombres= '';

if (usuarios[0]) {
    for (const persona of usuarios) {
        resulta.push(persona);
        listaNombres =`${listaNombres}
        <li class="oculto"><a><span>${persona.nombre}</span> - ${persona.mail}</a></li>`
    };

    $('#cotizacion').hide('2000');

    $('.historial').append(`
        <h2 class="container my-4">Si habías empezado a cotizar y te encontras en esta lista, podes seguir donde lo dejaste</h2>
        <p class="container my-4">Solo hace "click" en tu nombre y te redirigiremos</p>
        <ul class= "listaNombre shadow">
            ${listaNombres}
            <li class='marcasVehi btn btn-info btn-xl'>
                <a class='marcasVehi m-4 p-3'>Si ninguno de estos usuarios sos vos clickea este boton para continuar con la cotización</a>
            </li>
        </ul>
    `);

    $('.marcasVehi').on('click',(e)=>{
        $('#cotizacion').show('2000');
        $('.historial').hide('2000');
    })

    $('.listaNombre span').on(`click`,(e)=>{

        for (let i = 0; i < resulta.length; i++) {

            if (resulta[i].nombre == e.target.textContent) {
                $('.marcasVehi').replaceWith(`
                <h3 class='m-3'>DATOS INGRESADOS ANTERIORMENTE:</h3>
                <ul class='estiloLista'>
                    <li>${usuarios[i].nombre}</li>
                    <li>${usuarios[i].marca}</li>
                    <li>${usuarios[i].age}</li>
                    <li>${usuarios[i].puertas}</li>
                    <li>${usuarios[i].patentamiento}</li>
                    <li>${usuarios[i].region}</li>
                    <li>${usuarios[i].valorSeguro}</li>
                    <li>${usuarios[i].plan}</li>
                    <li>${usuarios[i].mail}</li>
                    <li>${usuarios[i].telefono}</li>
                </ul>
                <h4 class='m-3'>¿Son Correctos?:</h4>
                <p>Si son correctos haga click en "ACEPTAR PRESUPUESTO"</p>
                <p>De lo contraria oprima "COTIZAR NUEVAMENTE"</p>
                <div class=".d-sm-flex flex-row justify-content-between align-items-center">
                    <a href="cotizacion.html" class="botonConfirmar1  m-5 text-center btn btn-primary btn-xl">Cotizar Nuevamente</a>
                    <a class="contact botonConfirmar m-5 text-center btn btn-info btn-xl">ACEPTAR PRESUPUESTO</a>
                </div>`)
                
                $('.botonConfirmar').on('click',()=>{

                    $('.botonConfirmar').replaceWith(`
                    <h1 class='container m-3'>¡¡¡FELICITACIONES!!!,¡¡¡ACEPTASTE NUESTRO PRESUPUESTO Y YA ERES PARTE DE LA FAMILIA CHOCON!!!</h1>
                    <p class='container m-3'>EN BREVE NOS ESTAREMOS COMUNICANDO CON USTED PARA SEGUIR DANDOLE DETALLES...</p>`)
                })           
            }
        }       
    })
}
                   

                

 //   FUNCION PARA CREAR VARIAS COTIZACIONES/USUARIOS

let valorSeguroTerceros,valorSeguroTodo,valorSeguroBase;
let puertas,opciones,patentamiento,valorVehiculo;

function Usuario (marcaParam,añoVehiParam, puertasVehiParam, patentParam,regionParam,planParam,valorSeguroParam,nombreParam,mailParam,telParam) {
    this.marca = marcaParam;
    this.age = añoVehiParam;
    this.puertas = puertasVehiParam;
    this.patentamiento = patentParam;
    this.region = regionParam;
    this.plan = planParam;
    this.valorSeguro = valorSeguroParam;
    this.nombre = nombreParam;
    this.mail = mailParam;
    this.telefono = telParam;
} 
//        OBTENCION DE LISTA DE PROVINCIAS CON AJAX

let arrayProv= [];
document.addEventListener('DOMContentLoaded',()=> {
    $.getJSON({
        url:'https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre',


        success: function (data, textStatus, xhr) {
            console.log(textStatus);
            let provinci = (xhr.responseJSON.provincias);
        
            for(const prov of provinci){
                arrayProv.push(prov.nombre)
            }
        },
        error: function (xhr, status, error) {
            console.log(status);
        }
    })
});

let lista='';

for (let i = 0; i < marcasVehiculos.length; i++) {
      lista = `${lista}
<li>${marcasVehiculos[i]}</li>`
}
//        1er SELECCION Y 1er EVENTO (SELECCION DE MARCAS)

$(document).on('DOMContentLoaded',listado);
let div;
function listado() {
    div = $('#cotizacion')
    div.append(`
        <h1 class="container my-4"> Elegí la marca de tu vehículo</h1>
        <ul class= "estiloLista shadow">
            ${lista}
        </ul>`
    );
    $('.estiloLista li').on('click',evento1)
}

//          2da SELECCION Y 2do EVENTO (SELECCION DE AÑO DE VEHICULO)

let ageVehiculoValue, ageVehiculo, buttonVolver, marcaVehiculo;
 
function evento1(e) {
    marcaVehiculo =(e.target.textContent);
    div.replaceWith(`
        <div id="dom1" class="container">
            <h1 class= 'text-center'> Marca: ${marcaVehiculo}</h1>
            <form action="" id="formulario1">
                <label class="container h2" for="age">Elegí el año de tu vehiculo</label>
                <input required type="number" min="2000" max="2021" name="age" id="ageVehiculo" value="">
                <input class="btn btn-primary btn-l" id="buttonAge" type="submit" value="Confirmar">
            </form>
        </div>`
    );
    ageVehiculo = $('#ageVehiculo'); //GUARDADO DE VALUE DE AÑO 
    
    $('#buttonAge').on('click',rescatarValor1);
    $('#formulario1').on('submit',evento2);
}

function rescatarValor1() {      //FUNCION P/ RESCATAR VALOR DE AÑO ANTES DE QUE CAMBIE EL DOM
    ageVehiculoValue = ageVehiculo[0].value;
}

//         3ra SELECCION Y 3er EVENTO (SELECCION DE MODELO SEGUN CANT. DE PUERTAS)
function evento2(e){
    e.preventDefault ();
    console.log('segundo evento');       
    $('#dom1').replaceWith(`
        <div class="container flex-column">
            <h1 class= 'text-center'> Marca: ${marcaVehiculo}</h1>
            <h3>Año del vehiculo: ${ageVehiculoValue}</h2>
            <ul class="imgPuertas">
                <li value='5 Puertas' class="card text-center w-25 h-25 flex-column align-items-center justify-content-center p-4 shadow">
                    <img id='5 Puertas' value='5 Puertas' width="100" height="100" src="https://res.cloudinary.com/iunigo/image/upload//icons/car/doors/DOORS_5.svg" aria-hidden="true">
                    <p value='5 Puertas' class="text-sm mt-4">5 Puertas</p>
                </li>
                <li value='4 Puertas' class="card text-center w-25 h-25 flex-column align-items-center justify-content-center p-4 shadow">
                    <img id='4 Puertas' width="100" height="100" src="https://res.cloudinary.com/iunigo/image/upload//icons/car/doors/DOORS_4.svg" aria-hidden="true">               
                    <p value='4 Puertas' class="text-sm mt-4">4 Puertas</p>
                </li>
                <li value="3 Puertas" class="card text-center w-25 h-25 flex-column align-items-center justify-content-center p-4 shadow">
                    <img id="3 Puertas" width="100" height="100" src="https://res.cloudinary.com/iunigo/image/upload//icons/car/doors/DOORS_3.svg" aria-hidden="true">                
                    <p value="3 Puertas" class="text-sm mt-4">3 Puertas</p>
                </li>
            </ul>
        </div>`
    );

    $('.imgPuertas li').on('click', evento3)
}
//                       4ta SELECCION Y 4to EVENTO (SELECCION DE PROVINCIA Y VALOR VEHICULO)

function evento3(e) {
    puertas = (e.target.id)||(e.target.textContent);
    $('.imgPuertas').replaceWith(`
        <h3>Modelo: ${puertas}</h3>
        <div class="">
            <form action="" id="formulario2" class='flex-column'>
                <div class="flex-row">
                    <label for="provincia">Provinvia de patentamiento</label>
                    <select required name="provincia" id="provincia">
                        <option value="" selected disabled >Seleccionar</option>
                        ${opciones = arrayProv.map((i)=>{
                            return `<option value="${i}">${i}</option>`
                            } 
                        )}
                    </select> 
                </div>
                <div class="flex-row">
                    <label for="valor">Ingrese el valor de su vehiculo</label>
                    <input required type="number" min="100000" name="valor" id="valorVehiculo">
                </div>
                <input class="botonConfirmar btn btn-primary btn-l" type="submit" value="Confirmar">
            </form>
        </div>`
    );
   patentamiento =$('#provincia') //GUARDO SELECT PROVINCIA DE PATENTAMIENTO
   valorVehiculo =$('#valorVehiculo') //GUARDO INPUT VALOR VEHICULO
    $('#formulario2').on('submit', evento4) //EL MISMO CONFIRMAR ENVIA FORMULARIO
   
}
//-------------CALCULO SEGURO SEGUN ANTIGUEDAD ANTERIOR------
let presupuesto = $("#divCot");

function calculoSeguro() {
    switch (true) {
        case ((ageVehiculoValue >= 2000) && (ageVehiculoValue < 2005)):
            seguro(0.015);
        break;
        case ((ageVehiculoValue >= 2005) && (ageVehiculoValue < 2010)):
            seguro(0.018);
        break;
        case ((ageVehiculoValue >= 2010) && (ageVehiculoValue < 2015)):
            seguro(0.025);
        break;
        case ((ageVehiculoValue >= 2015) && (ageVehiculoValue < 2020)):
            seguro(0.03);
        break;
        default:
            seguro(0.035);
        break;
    }
}
function seguro(factor1) {
        switch (true) {
            case (puertas.includes('3')):
                valorSeguroBase = valorVehiculo * (factor1) *1.05
                break;
            case (puertas.includes('4')):
                valorSeguroBase = valorVehiculo * (factor1) * 1.1
                break;
            case (puertas.includes('5')):
                valorSeguroBase = valorVehiculo * (factor1) * 1.2
                break;
        }
        valorSeguroBase = Number(valorSeguroBase.toFixed(2));
}

//                       4ta SELECCION Y 4to EVENTO (SELECCION DE TIPO DE PLAN)
//                    ---------------------------------
function evento4(e) {
    e.preventDefault ();
    patentamiento = patentamiento[0].value;
    valorVehiculo = valorVehiculo[0].value;
    calculoSeguro();
    provRegion();

    valorSeguroTerceros= Number((valorSeguroBase * 1.5).toFixed(2))
    valorSeguroTodo= Number((valorSeguroBase * 3).toFixed(2))
    
    $('#formulario2').replaceWith(`
        <div>
            <h3>Provincia de patentamiento: ${patentamiento} ( Region ${regionPat})</h3>
            <h3>Valor de Vehiculo: ${valorVehiculo}</h3>
            <div class="card-group1 container">

                    <div class="card-body shadow card1">
                        <div> 
                            <div class='bg-info'> 
                                <h4 class="card-title p-2 mayus">Base</h4>
                            </div>                   
                            <p class='text-center h3 py-2'>$ ${valorSeguroBase}<span class='h6'>/mes(s/impuestos)</span></p>
                            <ul class='px-4 h6'>
                                <h5 class="card-title">Este plan incluye:</h5>
                                <li>✓ Responsabilidad Civil</li>
                                <li>✓ Incendio, daños y robo total</li>
                                <br/>
                                <h6 class="card-title">Este plan no incluye:</h6>
                                <li>x Daños parciales con franquicia</li>
                                <li>x Robo e incendio parcial</li>
                                <li>x Cristales</li>
                                <li>x Cerradura</li>
                                <li>x Granizo</li>
                                <li>x Daños parciales por inundación</li>
                                <br/>
                            </ul>
                        </div>            

                        <a id='Base' class="planes btn btn-primary btn-xl">Contratar Online</a>
                    </div>

                <div class="card-body shadow card1">
                    <div>
                        <div class='bg-info'>                    
                            <h4 class="card-title p-2 mayus">Terceros Completo</h4>
                        </div>
                        <p  class='text-center h3 py-2'>$ ${valorSeguroTerceros}<span class='h6'>/mes(s/impuestos)</span>
                        </p>
                        <ul class='px-4 h6'>
                            <h5 class="card-title">Este plan incluye:</h5>
                            <li>✓ Responsabilidad Civil</li>
                            <li>✓ Robo e incendio parcial</li>
                            <li>✓ Incendio, daños y robo total</li>
                            <li>✓ Cristales</li>
                            <li>✓ Cerradura</li>
                            <li>✓ Granizo</li>
                            <li>✓ Daños parciales por inundación</li>
                            <br/>
                            <h6 class="card-title">Este plan no incluye:</h6>
                            <li>x Daños parciales con franquicia</li>
                            <br/>
                        </ul>
                    </div>
                    <a id='TercerosCompleto' class="planes btn btn-primary btn-xl">Contratar Online</a>
                </div>

                <div class="card-body shadow card1">
                    <div>
                        <div class='bg-info'>                    
                            <h4 class="card-title p-2 mayus">Todo Riesgo</h4>
                        </div>
                        <p class='text-center h3 py-2'>$ ${valorSeguroTodo}<span class='h6'>/mes(s/impuestos)</span></p>
                        <ul class='px-4 h6'>
                            <h5 class="card-title">Este plan incluye:</h5>
                            <li>✓ Responsabilidad Civil</li>
                            <li>✓ Daños parciales con franquicia</li>
                            <li>✓ Robo e incendio parcial</li>
                            <li>✓ Incendio, daños y robo total</li>
                            <li>✓ Cristales</li>
                            <li>✓ Cerradura</li>
                            <li>✓ Granizo</li>
                            <li>✓ Daños parciales por inundación</li>
                            <br/>
                        </ul>
                    </div>
                    <a id='TodoRiesgo'class="planes btn btn-primary btn-xl">Contratar Online</a>
                </div>
            </div>
        </div>
    `)
    $('.planes').on('click', evento5);
}   
//------------CALCULO DE IMPUESTOS-------
const iva = 0.21;
let impuestoLocal, impuestos,registroVehiculo,ivaVehiculo,factorRegion,regionPat;

function provRegion() {
    for (const provincia of regiones) {
        (provincia.provincias).forEach(prov => {
            if (prov == patentamiento) {
                regionPat = provincia.nombre;
                switch (regionPat) {
                    case "Noreste":
                        factorRegion = 0.05;
                    break;
                    case "Cuyo":
                        factorRegion = 0.035;
                    break;
                    case "Noroeste":
                        factorRegion = 0.025;
                    break;
                    case "Pampeana":
                        factorRegion = 0.075;
                    break;
                    case "Patagónica":
                        factorRegion = 0.09;
                    break;
                }
            } 
        });
    }
}

function calculoImp(planElegidoValor) {
    impuestoLocal = Number((planElegidoValor * factorRegion).toFixed(2));
    ivaVehiculo = Number((planElegidoValor * iva).toFixed(2));
}
//------------------COTIZACION FINAL-----------

let planElegido, planElegidoValor,totalValor;

function evento5(e) {
    e.preventDefault ();

    $('.planes').off('click');

    planElegido = e.target.id;

    if (planElegido.length> 4 && planElegido.length<12) {
        planElegido = 'Todo Riesgo'
        planElegidoValor = valorSeguroTodo
    } else if(planElegido.length> 12){
        planElegido = 'Terceros Completo'
        planElegidoValor = valorSeguroTerceros
    }else{
        planElegidoValor = valorSeguroBase
    }
    calculoImp(planElegidoValor);

    impuestos = Number((ivaVehiculo + impuestoLocal).toFixed(2));
    totalValor = '$ '+((impuestos + planElegidoValor).toFixed(2))

    $('#divCot').append(`
    <table class='my-3 py-2' id="tabla" border="">
        <caption>
        Datos de solicitud de presupuesto:
        </caption>
        <tbody>
            <tr>
                <td class='bg-info'>Plan Elegido</td>
                <td class='bg-info'>Plan ${planElegido}</td>
            </tr>
            <tr>
                <td>Año del Vehiculo</td>
                <td>${ageVehiculoValue}</td>
            </tr>
            <tr>
                <td>Valor de Mercado</td>
                <td>${valorVehiculo}</td>
            </tr>
            <tr>
                <td>Marca del Vehiculo</td>
                <td>${marcaVehiculo}</td>
            </tr>
            <tr>
                <td>Modelo del Vehiculo</td>
                <td>${puertas}</td>
            </tr>
            <tr>
                <td>Lugar de patentamiento</td>
                <td>${patentamiento}</td>
            </tr>
            <tr>
                <td>Región</td>
                <td>${regionPat}</td>
            </tr>
        </tbody>
    </table>
            <ul id="listaPresupuesto"> 
                <li class='py-1'>>-Valor Neto de seguro: $ ${planElegidoValor}</li>
                <li class='py-1'>>-Impuestos:
                    <ul> 
                        <li class='py-1'>.Impuesto según Region: $ ${impuestoLocal}</li>
                        <li class='py-1'>>.IVA 21%: $ ${ivaVehiculo}</li>
                        <li class='py-1'>>.Total de Impuestos: $ ${impuestos}</li>
                    </ul> 
                </li>
                <li class='h4 py-3'>-Costo total plan ${planElegido}:  ${totalValor}</li>
            </ul>
    <div id="otro" class=".d-sm-flex flex-row justify-content-between align-items-center">
        <a href="cotizacion.html" class="botonConfirmar1  m-5 text-center btn btn-primary btn-xl">Cotizar Nuevamente</a>
        <a  class="contact botonConfirmar2 botonConfirmar1 m-5 text-center btn btn-info btn-xl">Confirme para que nos contactemos con usted</a>
    </div> 
    `);
    $('.contact').on('click',contacto);
} 
function contacto(e) {

    $('.contact').replaceWith(` 
                     <div class="otro2">     
                        <h2  class='m-4'>Complete con sus datos para recibir la confirmacion del servicio</h2>
                        <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                            <div class="label form-floating mb-3">
                                <input class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" data-sb-can-submit="yes"/>
                                <label for="name">Nombre Completo</label>
                                <div class="invalid-feedback d-none" data-sb-feedback="name:required">Campo Nombre obligatorio</div>
                            </div>
                            <div class="label form-floating mb-3">
                                <input class="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                <label for="email">Direccion de Email</label>
                                <div class="invalid-feedback" data-sb-feedback="email:required">Ingrese Email</div>
                                <div class="invalid-feedback" data-sb-feedback="email:email">Email invalido</div>
                            </div>
                            <div class="label form-floating mb-3">
                                <input class="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                <label for="phone">Numero de Telefono</label>
                                <div class="invalid-feedback" data-sb-feedback="phone:required">Campo telefono obloigatorio</div>
                            </div>
                            <div class="d-grid">
                                <button class="btn btn-primary btn-xl" id="submitButton"    type="submit">Confirmar</button>
                                </div>
                        </form>
                    </div>`)
    $('#contactForm').on('submit', envioOk)
}

function envioOk(e) {
    e.preventDefault ();

     $('.otro2').hide(200,()=>{
        $('#otro').append(`
        <h1 class='container m-5 p-4 text-center'>¡¡¡FELICITACIONES!!!,¡¡¡ACEPTASTE NUESTRO PRESUPUESTO Y YA ERES PARTE DE LA FAMILIA CHOCON!!!</h1>
        <p class='container m-3 text-center'>EN BREVE NOS COMUNICAREMOS CON USTED PARA DARLE MÁS DETALLES</p>`)
     })

    let nombre = $('#name')
    let mail = $('#email')
    let tel = $('#phone')
    nombre = (nombre[0].value).toUpperCase()
    mail = (mail[0].value).toLowerCase()
    tel = tel[0].value

    usuarios.push(new Usuario(marcaVehiculo,ageVehiculoValue,puertas,patentamiento,regionPat,planElegido,totalValor,nombre,mail,tel));

    let usuarioJSON =JSON.stringify(usuarios);
    localStorage.setItem('cliente', usuarioJSON);
}
    
$('#contactForm2').on('submit',hola)
function hola(e){
    e.preventDefault ();
    $('#contactForm2').replaceWith(`
    <h1 class='container m-3'>¡MUCHAS GRACIAS POR COMUNICARTE CON NOSOTROS!</h1>
        <p class='container m-3'>EN BREVES INSTANTES, NOS COMUNICAREMOS CON USTED PARA OFRECERLE LOS MEJORES PLANES DE SERVICIOS...</p>
        `)
}