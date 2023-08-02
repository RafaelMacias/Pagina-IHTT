//var host = "http://200.107.120.44:84/";
var modulo=59;
var cssRule =
    "color: #f44336 ;" +
    "font-size: 60px;" +
    "font-weight: bold;" +
    "text-shadow: 1px 1px 5px rgb(249, 162, 34);" +
    "filter: dropshadow(color=rgb(249, 162, 34), offx=1, offy=1);";

console.log("%c ¡Detente!", cssRule);
console.log("%cEl uso de scripts para modificar el contenido puede infringir el reglamento interno de la institución.", "text-shadow: 1px 1px 5px rgb(249, 162, 34); color: #b71c1c; font-size: x-large");


//ESTO SE USA PARA LA FUNCION DEL TOAST NUEVO DE NOTY
var type = ['','info','success','warning','danger'];


/*-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@ FUNCIONES TOOLTIPS & POPOVER @@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
//TOOLTIP BOOTSRAP
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
  container: 'body'
})
//POPOVER BOOTSRAP
$(function () {
  $('[data-toggle="popover"]').popover({
  placement:"left",
  trigger:'hover',
  delay:800
  })
})

/*-@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@ FUNCIONES MODAL @@@
   @@@@@@@@@@@@@@@@@@@@@@@@@*/
//CLOSE MODAL BOOTSRAP
function cerrarModal(id){
  $('#'+id).modal('hide');
  $("body").css("overflow-y","scroll");
}
//OPEN MODAL BOOTSRAP
function openModal(id){
  $("#"+id).modal('show');
  // $("body").css("overflow-y","hidden");
}

/*-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@ FUNCIONES PARA LOS TOAST @@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
//WARNING TOAST
function toastwarning(text){
$.notify({
  // options
  icon: 'fas fa-exclamation-triangle',
  title: "<strong>Advertencia:</strong> ",
  message: ' '+text+' ' 
},{
  // settings
  type: 'warning',
  animate: {
    enter: 'animated bounceInDown',
    exit: 'animated bounceOutUp'
  },
  delay: 2000
});
}

//ERROR TOAST
function toasterror(text){
$.notify({
  // options
  icon: 'fas fa-exclamation-circle',
  title: "<strong>Error:</strong> ",
  message: ' '+text+' ' 
},{
  // settings
  type: 'danger',
  animate: {
    enter: 'animated bounceInDown',
    exit: 'animated bounceOutUp'
  },
  delay: 15000
});
}

//SUCCES TOAST
function toastsuccess(text){
$.notify({
  // options
  icon: 'fas fa-check-circle',
  title: "<strong>Exito:</strong> ",
  message: ' '+text+' ' 
},{
  // settings
  type: 'success',
  animate: {
    enter: 'animated bounceInDown',
    exit: 'animated bounceOutUp'
  },
  delay: 2000
});
}

/*-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@ FUNCION PARA MODIFICAR LA CLAVE @@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
function modificarpas(){
      var clave1 = $('#Nclave').val();
      var clave2 = $('#Cclave').val();

      if (clave1 != clave2) {
        toasterror('<strong>¡Error!</strong> Las Contraseñas no coinciden intente nuevamente');
        return
      }
      if (clave1=="") {
        toastwarning('<strong>¡Advertencia!</strong> Debe ingresar una Contraseña');
        return
      }
      var parameters = "&pass="+clave1;
      $.ajax( {
            dataType:"json",
            url:"api_satt.php?action=ResetPass&pass"+parameters,
            timeout:5000,
            success:function( datos ) {
             if (datos.result==1) {
              cerrarModal('Modify')
              toastsuccess('<strong>¡Exito!</strong> Clave Modificada con Exito');
              $('#Nclave').val('');
              $('#Cclave').val('');
             }

            }
        })
    }
/*-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
   @@@@@ FUNCIONES PARA LAS COOKIES DEL USUARIO @@@
   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
function cookiesession(parametro,name){
   /*return*/ document.cookie = ""+parametro+"="+name+"; expires=0; path=thepath; domain="+document.domain+""; //-->EL RETURN SI VA EN LOS OTROS QUE NO SEAN BOTON--//
   window.location.href="/login.php?logout"; //-->ESTO NO VA EN LOS OTROS YA QUE ESTO ES PARA BOTON--//
}

function obtenerCookie(parametro) {
    var name = parametro + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}


function Aceptar(Activi,Areaiba,idmov,sol){
    cookiesession('Activi', Activi);    cookiesession('Areaiba', Areaiba);  cookiesession('idmov', idmov);  cookiesession('sol', sol); cookiesession('validateaction', 1);
    window.location.href="https://satt.transporte.gob.hn:84/Expedientes/BandejaDeEntrada.php";
 }


function setVar(name, data){
  window.localStorage.setItem(name, data);
}

function isNumber(evt) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      //console.log(charCode);
        if (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) {

            return false;
        }
        return true;
}

function isLetter(evt) {
       evt = (evt) ? evt : window.event;
      var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
          ((evt.which) ? evt.which : 0));
       if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
          return false;
       }
       return true;
}

function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
}