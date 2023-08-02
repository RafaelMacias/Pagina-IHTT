$(document).ready(function(){


});

//Funcion para cargar archivos adjuntos
function CargaSolicitud(){
$('#numeracion').html('0%');
$('.determinate').css('width','0%')

    var validarsubir=$('.file-path').val();
    var documentoFTT = $('#EscaneoSolicitud').prop('files')[0];

    if(validarsubir==""){
      toastwarning("!ERROR¡ Debe Seleccionar un Archivo Primero");
      return false;
    }

    if($("#nombrepdf").val().trim().length<1){
      toastwarning("El Campo de la VIN esta Vacío");
      return;
    }

    var form_data = new FormData();
    form_data.append("action","save-escaneo");
    form_data.append("EscaneoSolicitud",documentoFTT);
    form_data.append("ArchivoTemporal",$('#ArchivoTemporal').val());
    form_data.append("categoria",$('#categoria').val());
    form_data.append("nombrepdf",$('#nombrepdf').val());
    form_data.append("desccategoria",$('#desccategoria').val());

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
                      ArchivosSolicitud(); 
                  });
                  $("#contenthome").removeClass("a");
                  $("#contenthome").addClass("m");

                  $("#archivos").css("display","block");
                  $('#ArchivoTemporal').val(datar.TBARCHIVO);
                  $('.file-path').val('');
            }else if (datar.result==3) {
              sweetAlert("EL ARCHIVO NO SE PUDO SUBIR", "Ya existe un tipo de archivo con ese nombre", "error");
              $("#grabap2").css("display","block");
            }else if (datar.result==4) {
              sweetAlert("EL ARCHIVO NO SE PUDO SUBIR", "Debe de seleccionar un archivo", "error");
              $("#grabap2").css("display","block");
            }else if (datar.result==5) {
              sweetAlert("EL ARCHIVO NO SE PUDO SUBIR", "El tipo de archivo seleccionado no esta permitido para subir", "error");
              $("#grabap2").css("display","block");
            }else {
              sweetAlert("!ATENCIÓN¡",data, "error");
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

function ArchivosSolicitud(){
    var form_data = new FormData();
    form_data.append("action","ArchivosSolicitud");
    form_data.append("categoria",$('#ArchivoTemporal').val());

    $.ajax({
    url: 'Api_PW.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
      success: function(dataserver){
        console.log(dataserver);
        var data = dataserver[0];
        var documento = '';
        $("#archivos").css("display","block");
        $("#nombrepdf").val("");
      if(data.length>0){
         var n = 0;
          for(var i=0;i<data.length;i++){
            n = n+1
            documento += '<tr> <th scope="row">'+n+'</th> <td style="text-align:center;"><a target="_blank" href="Documentos/'+$('#ArchivoTemporal').val()+'/'+data[i].ARCHIVO+'" style="color: #3b6279;" >'+data[i].ARCHIVO+'</a></td> <td style="text-align:center;"><i id="borrardoc" onclick="confirmarEliminarArchivos(\''+data[i].ARCHIVO+'\')" class="fas fa-trash text-danger mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete item"></i></td> </tr>';
          }
      }else{
        $("#archivos").css("display","none");
        documento +='';
      }

      $('#ArchivosSolicitudtable').html(documento);

      }
    });
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@ FUNCION PARA ELIMINAR ARCHIVOS ADJUNTOS @@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function confirmarEliminarArchivos(id){

  swal({ 
  title: "",
  text: '<div class="fm-notification-body"> <div class="fm-notification-icon"> <div class="fm-del-contact-avatar"> <span></span> <div class="fm-del-contacts-number">1</div> </div> </div> <div class="fm-notification-info"> <p>¿Estás seguro de que quieres eliminar el archivo seleccionado?</p> <div class="fm-notification-warning">Aviso: Cualquier archivo eliminado no se podra recuperar!</div> </div> <div class="clear"></div> </div>',
  html: true,
  showCancelButton: true,
  cancelButtonText: "No",
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Si",
  closeOnConfirm: false 
},function(){
  EliminarArchivo(id);
});
   
$("#contenthome").removeClass("m");
$("#contenthome").addClass("a");
}

function EliminarArchivo(id){
  sweetAlert({ title: "",
     text: "espere un momento por favor ...",
     showConfirmButton: false,
  }); 
   var form_data = new FormData();
   form_data.append("action","EliminarDocumento");
   form_data.append("Borrar",id);
   form_data.append("ArchivoTemporal",$('#ArchivoTemporal').val());

   $.ajax({
    url: 'Api_PW.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
        success: function(dataserver){
          swal("Borrado", "El Archivo a sido Eliminado", "success");
          ArchivosSolicitud();
       }
    });
}

//Funcion para recuperar la descripcion de la categoria
function getDescCategoria() {

  postdata = {
      action: "get-categoria",
      cat: $('#categoria').val()
    }
    $.post( "Api_PW.php", postdata, null, "json" )
      .done(function( datos, textStatus, jqXHR ) {
          var cat = datos[0];
          if(datos[1]>0){
            $("#desccategoria").val(cat[0].DESC_Categoria); 
            $('#ArchivoTemporal').val(cat[0].DESC_Categoria);
            ArchivosSolicitud();
          }
      })
    .fail(function( jqXHR, textStatus, errorThrown ) {
      if ( console && console.log ) {
        //toasterror("Error de conexión intenta nuevamente");
        swal({
          type: 'error',
          title: '!Error¡',
          text: 'Error al obtener la categoria',
        })
      }
  });
}