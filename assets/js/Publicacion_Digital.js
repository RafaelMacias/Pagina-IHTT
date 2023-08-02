$(document).ready(function(){


});


//Funcion de insert like o dislike
function saveOpinion(tipo) {

   var form_data = new FormData();
   form_data.append("action","save-opinion");
   //Datos para el insert del like
   form_data.append("idpublicacion", $("#idpublicacion").val());
   form_data.append("tipoopinion", tipo);
  
   fetch("Api_PW.php",
    {
      method: "POST",
      body: form_data
    })
      .then((resp) => resp.json())
      .then(Data=>{
         if (Data.status==1) {
             getTotalVistas_General();
         }else {
            sweetAlert("!ATENCIÓN¡",Data.status, "error");
         }
      })
    .catch(err=>{ console.log(err); });
}

//Funcion para confirmar enviar correo
function confirmar_enviar_correo(){
  //Datos de la constancia
  if($('#correo').val().trim().length<1 || !validateEmail($('#correo').val())){
      toastwarning("El correo electronico no es valido.");
      return;
  }
  if($("#comentario").val().trim().length<1){
    toastwarning("El campo del comentario es obligatorio.");
    return;
  } 
  
  swal({
      title: "¿Esta seguro de enviar el correo?",
      text: "¡Se enviará el correo con su comentario antes descrito!",
      type: "warning",
      html:true,
      showCancelButton: true,
      cancelButtonText: "!No¡ cancelar",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "!Si¡ enviar",
      closeOnConfirm: false
    },
    function(){
      Enviarcorreo();
    });
   $("#contenthome").removeClass("m");
   $("#contenthome").addClass("a");
}

//Funcion para eliminar la imagen cargada
function confirmarEliminar(){

  swal({ 
  title: "",
  text: '<div class="fm-notification-body"> <div class="fm-notification-icon"> <div class="fm-del-contact-avatar"> <span></span> <div class="fm-del-contacts-number">1</div> </div> </div> <div class="fm-notification-info"> <p>¿Estás seguro de que quieres eliminar la publicación seleccionada?</p> <div class="fm-notification-warning">Aviso: Cualquier publiación eliminada no se podra recuperar!</div> </div> <div class="clear"></div> </div>',
  html: true,
  showCancelButton: true,
  cancelButtonText: "No",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si",
  closeOnConfirm: false 
  },function(){
    eliminarPublicacion();
  });
   
  $("#contenthome").removeClass("m");
  $("#contenthome").addClass("a");
}

//Funcion eliminar publicacion
function eliminarPublicacion() {

  var form_data = new FormData();
    form_data.append("action","delete-publicacion");
    //Datos de la publicacion
    form_data.append("idpublicacion", $("#idpublicacion").val());
    form_data.append("idimagen", $("#idimagen").val());
    form_data.append("nombre_imagen", $("#nomimagen").val());
    form_data.append("desctipo", $("#desctipo").val());
    form_data.append("tipo", 2);
  
    fetch("Api_PW.php",
    {
      method: "POST",
      body: form_data
    })
      .then((resp) => resp.json())
      .then(Data=>{
        if (Data.status==1) {
          swal({
            title: "Publicación eliminada satisfactoriamente!",
            //text: "<b>Nota:</b> La Noticia estará publica en la fecha que haya elegido.",
            type: "success",
            html:true,
            confirmButtonText: "Continuar"
          },function () {
            cerrarVentana();
          });
          $("#contenthome").removeClass("a");
          $("#contenthome").addClass("m");
        } else {
          sweetAlert("!ATENCIÓN¡",Data.status, "error");
        }
      })
    .catch(err=>{ console.log(err); });
}

//Funcion para cargar archivos adjuntos
function CargaImgPublicacion(){
$('#numeracion').html('0%');
$('.determinate').css('width','0%')

    var validarsubir=$('.file-path').val();
    var documentoFTT = $('#EscaneoSolicitud').prop('files')[0];

    if(validarsubir==""){
      toastwarning("!ERROR¡ Debe Seleccionar un Archivo Primero");
      return false;
    }
    if($("#nombreimg").val().trim().length<1){
      toastwarning("El Campo del Nombre esta Vacío");
      return;
    }

    var form_data = new FormData();
    form_data.append("action","save-img-publicacion-dig");
    form_data.append("nombreimg",$('#nombreimg').val());
    form_data.append("desctipo",$('#desctipo').val());
    form_data.append("EscaneoSolicitud",documentoFTT);
    form_data.append("ArchivoTemporal",$('#ArchivoTemporal').val());

      sweetAlert({ 
          title: "Subiendo archivo(s)",
          text: '<div id="barra" > <div class="progress"> <div class="determinate" style="width: 0%"></div> </div> <div id="numeracion" style=" text-align: center; ">0%</div> </div>',
          html: true,
          showConfirmButton: false
      });
      $("#barra").show(400);

         $.ajax({
          url: 'Api_PW.php',
          dataType: 'json',
          cache: false,
          contentType: false,
          processData: false,
          data: form_data,
          type: 'post',
          success: function(data){
              var datar = data;
              console.log(datar);
              if(datar.result==1){

                  swal({title: "Archivo(s) Subidos",
                        text: "archivo subido con exito ...",
                        confirmButtonText: "Presione Ok Para Continuar"},
                      function(){
                      // ArchivosSolicitud(); 
                  });
                  $("#contenthome").removeClass("a");
                  $("#contenthome").addClass("m");

                  $('#ArchivoTemporal').val(datar.TBARCHIVO);
                  //Id de la imagen
                  $('#idimagen').val(datar.IDI);
                  //Nombre de la imagen
                  $("#nombreimagen").html(datar.Nombre);
                  //Limpia el input
                  $('.file-path').val('');
                  RecuperarImgPublicacion(datar.Nombre,datar.Tipo);
            }else if (datar.result==3) {
              sweetAlert("EL ARCHIVO NO SE PUDO SUBIR", "Ya existe un tipo de archivo con ese nombre", "error");
              $('.file-path').val('');
            }else if (datar.result==4) {
              sweetAlert("EL ARCHIVO NO SE PUDO SUBIR", "Debe de seleccionar un archivo", "error");
              $('.file-path').val('');
            }else if (datar.result==5) {
              sweetAlert("EL ARCHIVO NO SE PUDO SUBIR", "El tipo de archivo seleccionado no esta permitido para subir", "error");
              $('.file-path').val('');
            }else {
              sweetAlert("!ATENCIÓN¡",data, "error");
              $('.file-path').val('');
            }
          },
       xhr: function() {
        // creamos un objeto XMLHttpRequest
        var xhr = new XMLHttpRequest();
 
        // gestionamos el evento 'progress'
        xhr.upload.addEventListener('progress', function(evt) {
 
          if (evt.lengthComputable) {
            // calculamos el porcentaje completado de la carga de archivos
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);
 
            // actualizamos la barra de progreso con el nuevo porcentaje
            $('#numeracion').html(percentComplete+'%');
            $('.determinate').css('width',''+percentComplete+'%');

            // una vez que la carga llegue al 100%, ponemos la progress bar como Finalizado
            if (percentComplete === 100) {
              $('.progress-bar').html('Finalizado');
            }
          }
        }, false);
 
        return xhr;
      }
     })
}

function RecuperarImgPublicacion(nombre,tipo) {

  $("#tarimagen").show();

  var dataurl = 'Documentos/Imagenes/'+tipo+'/'+nombre;
  document.getElementById('preview').src = dataurl;
            
}

function getIdImagen() {

  confirmarEliminarImagen($('#idimagen').val());

}

//Funcion para eliminar la imagen cargada
function confirmarEliminarImagen(id){

  swal({ 
  title: "",
  text: '<div class="fm-notification-body"> <div class="fm-notification-icon"> <div class="fm-del-contact-avatar"> <span></span> <div class="fm-del-contacts-number">1</div> </div> </div> <div class="fm-notification-info"> <p>¿Estás seguro de que quieres eliminar la imagen seleccionada?</p> <div class="fm-notification-warning">Aviso: Cualquier imagen eliminada no se podra recuperar!</div> </div> <div class="clear"></div> </div>',
  html: true,
  showCancelButton: true,
  cancelButtonText: "No",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si",
  closeOnConfirm: false 
  },function(){
    EliminarImagen(id);
  });
   
  $("#contenthome").removeClass("m");
  $("#contenthome").addClass("a");
}
//Elimina la imagen seleccionada
function EliminarImagen(id){
  sweetAlert({ title: "",
     text: "espere un momento por favor ...",
     showConfirmButton: false,
  }); 
   var form_data = new FormData();
   form_data.append("action","EliminarImagen");
   form_data.append("Borrar",id);
   form_data.append("nombre_imagen",$('#nombreimagen').html());
   form_data.append("tipo",1);

   $.ajax({
    url: 'Api_PW.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
        success: function(dataserver){
          swal("¡Borrada!", "La imagen a sido Eliminado", "success");
          LimpiarCamposImagen();
       }
    });
}

//Funcion para eliminar la imagen cargada dentro del modal
function confirmarEliminarImagenModal(){

  swal({ 
  title: "",
  text: '<div class="fm-notification-body"> <div class="fm-notification-icon"> <div class="fm-del-contact-avatar"> <span></span> <div class="fm-del-contacts-number">1</div> </div> </div> <div class="fm-notification-info"> <p>¿Estás seguro de que quieres eliminar la imagen seleccionada?</p> <div class="fm-notification-warning">Aviso: Cualquier imagen eliminada no se podra recuperar!</div> </div> <div class="clear"></div> </div>',
  html: true,
  showCancelButton: true,
  cancelButtonText: "No",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si",
  closeOnConfirm: false 
  },function(){
    EliminarImagenModal();
  });
   
  $("#contenthome").removeClass("m");
  $("#contenthome").addClass("a");
}
//Elimina la imagen seleccionada
function EliminarImagenModal(){
  sweetAlert({ title: "",
     text: "espere un momento por favor ...",
     showConfirmButton: false,
  }); 
   var form_data = new FormData();
   form_data.append("action","EliminarImagen");
   form_data.append("Borrar",$('#idimagen').val());
   form_data.append("nombre_imagen",$('#nomimagen').val());
   form_data.append("idpublicacion",$('#idpublicacion').val());
   form_data.append("tipo",2);

   $.ajax({
    url: 'Api_PW.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
        success: function(dataserver){
          swal("¡Borrada!", "La imagen a sido Eliminado", "success");
          LimpiarCamposImagen();
          cerrarModal();
          actualizar();
       }
    });
}
//Limpia los campos una vez la imagen se haya cargado
function LimpiarCamposImagen() {
  $("#tarimagen").hide();
  var no_image = 'assets/img/no-image.png';
  document.getElementById('preview').src = no_image;
  $('.file-path').val('');
  $('#nombreimg').val('');
  $('#nombreimagen').html('');
  $("#posimagen").val('-1').trigger('change');
}

//Funcion para eliminar la imagen cargada
function confirmarUpdateTitulo(){

  if($("#titulo").val().trim().length<1){
    toastwarning("Debes escribir el nuevo titulo de la publicación");
    return;
  }

  swal({ 
  title: "¿Esta seguro de modificar el titulo de esta publicación?",
  html: true,
  showCancelButton: true,
  cancelButtonText: "No",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si",
  closeOnConfirm: false 
  },function(){
    saveCambioTitulo();
  });
   
  $("#contenthome").removeClass("m");
  $("#contenthome").addClass("a");
}
//Guardar Cambio de titulo
function saveCambioTitulo() {

  var form_data = new FormData();
    form_data.append("action","update-titulo");
    //Datos de la publicación
    form_data.append("idpublicacion", $("#idpublicacion").val());
    form_data.append("titulo", $("#titulo").val());
    
    fetch("Api_PW.php",
    {
      method: "POST",
      body: form_data
    })
      .then((resp) => resp.json())
      .then(Data=>{
        if (Data.status==1) {
          swal({
            title: "¡Se modifico el titulo correctamente!",
            type: "success",
            html:true,
            confirmButtonText: "Continuar"
          },function () {
            actualizar();
          });
          $("#contenthome").removeClass("a");
          $("#contenthome").addClass("m");
        } else {
          sweetAlert("!ATENCIÓN¡",Data.status, "error");
        }
      })
    .catch(err=>{ console.log(err); });
}

//Funcion confirmar el cambio de fecha
function confirmarUpdateFecha(){

  if($("#fechaplu").val().trim().length<1){
    toastwarning("Debes seleccionar la nueva fecha de la publicación");
    return;
  }

  swal({ 
  title: "¿Esta seguro de modificar la fecha de esta publicación?",
  html: true,
  showCancelButton: true,
  cancelButtonText: "No",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si",
  closeOnConfirm: false 
  },function(){
    saveCambioFecha();
  });
   
  $("#contenthome").removeClass("m");
  $("#contenthome").addClass("a");
}

//Guardar Cambio de fecha
function saveCambioFecha() {

  var form_data = new FormData();
    form_data.append("action","update-fecha");
    //Datos de la publicación
    form_data.append("idpublicacion", $("#idpublicacion").val());
    form_data.append("fecha_plublicacion", $("#fechaplu").val());
    
    fetch("Api_PW.php",
    {
      method: "POST",
      body: form_data
    })
      .then((resp) => resp.json())
      .then(Data=>{
        if (Data.status==1) {
          swal({
            title: "¡Se modifico la fecha correctamente!",
            type: "success",
            html:true,
            confirmButtonText: "Continuar"
          },function () {
            actualizar();
          });
          $("#contenthome").removeClass("a");
          $("#contenthome").addClass("m");
        } else {
          sweetAlert("!ATENCIÓN¡",Data.status, "error");
        }
      })
    .catch(err=>{ console.log(err); });
}

//Funcion confirmar el cambio de fecha
function confirmarUpdateImagen(){

  var validarsubir = $('#EscaneoSolicitud').val();

  if(validarsubir== ""){
    toastwarning("!ERROR¡ Debe Seleccionar un Archivo Primero");
    return false;
  }
  if($("#nombreimg").val().trim().length<1){
    toastwarning("El Campo del Nombre esta Vacío");
    return;
  }

  swal({ 
  title: "¿Esta seguro de modificar la imagen y sus configuraciones de esta publicación?",
  html: true,
  showCancelButton: true,
  cancelButtonText: "No",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si",
  closeOnConfirm: false 
  },function(){
    updateImagenPublicacion();
  });
   
  $("#contenthome").removeClass("m");
  $("#contenthome").addClass("a");
}

function updateImagenPublicacion() {

  var form_data = new FormData();
    form_data.append("action","update-imagen");
    //Datos de la imagen
    form_data.append("idpublicacion", $("#idpublicacion").val());
    form_data.append("idimagen", $("#idimagen").val());
    
    fetch("Api_PW.php",
    {
      method: "POST",
      body: form_data
    })
      .then((resp) => resp.json())
      .then(Data=>{
        if (Data.status==1) {
          swal({
            title: "¡Se modifico la imagen y sus configuraciones correctamente!",
            type: "success",
            html:true,
            confirmButtonText: "Continuar"
          },function () {
            actualizar()
          });
          $("#contenthome").removeClass("a");
          $("#contenthome").addClass("m");
        } else {
          sweetAlert("!ATENCIÓN¡",Data.status, "error");
        }
      })
    .catch(err=>{ console.log(err); });
}

function cerrarVentana(){
  window.close();
  //window.location.reload(true);
}

function actualizar(){
  //window.close();
  window.location.reload(true);
}
