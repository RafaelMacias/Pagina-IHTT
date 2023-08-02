$(document).ready(function(){
  
  $("#documentoFTT").change(function(){
    if(!validateFile("documentoFTT")){
        $("#documentoFTT").val("");
        toastwarning("!ERROR¡ El archivo Seleccionado no es PDF");
        $('.file-path').val('');
    }
  });

/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  @@@ FUNCION PARA VALIDAR LA CARGA DE PDF @@@
/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/
function validateFile(id){
    var ext = $('#'+id).val().split('.').pop().toLowerCase();
    if($.inArray(ext, ['pdf']) == -1) {
        return false;
    }
    return true;
}

});

//Validacion la cual muestra el mes para seleccionar
function validaryear () {
   $('#valyear').show();
   if ($('#inputyear').val()==1) {
      Relojmarcador()
   }
}
//Validacion la cual permite hacer la busqueda del año si el inputyear es 1
function validarmes () {
   $('#inputyear').val(1); 
   $('#tablehoras').show();
   Relojmarcador()

}
//Funcion para recuperar los datos del reloj del usuario 
function Relojmarcador() {
  $("#DatosReloj").html('<tr><td colspan="12" style="text-align:center"><i class="far fa-smile-beam" style="margin-right: 5px;"></i>Buscando tus datos...<br><div class="progress"> <div class="progress-bar progress-bar-striped bg-success" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 100%;animation: 0s ease 0s 1 normal none running animate-positive !important;"></div> </div></td></tr>');

      postdata = {
        // action: "",
        Empleado: $('#idemple').val(),
        Anio: $('#Anio').val(),
        Mes: $('#Mes').val()
      }
      $.post( "Api_Reloj.php", postdata, null, "json" )
          .done(function( datos, textStatus, jqXHR ) {
               var data = datos[0];

               var RelojMarcador = '';
               var RelojMarcadort = '';
               var minutosT=0;
               var minutosR=0;
               var nferT=0;
               var npasT=0;
               var nincT=0;
               var perespT=0;
               var nvacT=0;
               var tdias=0;
               var finde=0;
               var sinsal=0;
               var sinent=0;
               var hpsal=0;
               var mpsal=0;
               var hping=0;
               var mping=0;
               var diasemanax='';
               if(data.length>0){
                  for(var i=0;i<data.length;i++){
                     cont = i+1; 
                     switch(data[i].DiaSemana){
                        case 'Sunday':
                           diasemanax='Domingo';
                           break;
                        case 'Monday':
                           diasemanax='Lunes';
                           break;
                        case 'Tuesday':
                           diasemanax='Martes';
                           break;
                        case 'Wednesday':
                           diasemanax='Miercoles';
                           break;
                        case 'Thursday':
                           diasemanax='Jueves';
                           break;
                        case 'Friday':
                           diasemanax='Viernes';
                           break;
                        case 'Saturday':
                           diasemanax='Sabado';
                           break;
                    }

                     if (diasemanax=='Sabado' || diasemanax=='Domingo' ) {
                        RelojMarcador +='<tr style="background: rgba(56, 142, 60, 0.18);">';
                        finde++;
                     }else{
                        RelojMarcador +='<tr>';
                     }
                     //datos iniciales de la tabla
                     RelojMarcador += '<td>'+cont+'</td> <td>'+data[i].Fecha+'</td> <td>'+data[i].DiaSemana+'</td>';
                     //obtiene la hora de entrada
                     if (data[i].Hora_Ingreso==null) {
                        RelojMarcador +='<td>Sin Marcar</td>';
                        if ((diasemanax=='Lunes' || diasemanax=='Martes' || diasemanax=='Miercoles' || diasemanax=='Jueves' || diasemanax=='Viernes') && data[i].nfer==0 && data[i].nvac==0){
                         sinent++;
                        }
                     }else{
                        RelojMarcador +='<td>'+data[i].Hora_Ingreso+'</td>';
                     }
                     //obtiene el icono de la hora de entrada
                     if (data[i].Hora_Ingreso > '09:00:00') {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-warning"><span class="fas fa-user-clock"></span></span></td>';
                     }else if (data[i].Hora_Ingreso==null) {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-danger"><span class="fas fa-user-times"></span></span></td>';

                     }else{
                        RelojMarcador +='<td style="text-align: center;"><span class="text-success"><span class="fas fa-user-check"></span></span></td>';
                     }
                     //obtiene la hora de salida
                     if (data[i].Hora_Salida==null ) {
                        RelojMarcador +='<td>Sin Marcar</td>';
                        if ((diasemanax=='Lunes' || diasemanax=='Martes' || diasemanax=='Miercoles' || diasemanax=='Jueves' || diasemanax=='Viernes') && data[i].nfer==0 && data[i].nvac==0){
                         sinsal++;
                        }
                     }else{
                        RelojMarcador +='<td>'+data[i].Hora_Salida+'</td>';
                     }
                     //obtiene el icono de la hora de salida
                     if (data[i].Hora_Salida < '17:00:00') {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-warning"><span class="fas fa-user-clock"></span></span></td>';
                     }else if (data[i].Hora_Salida==null) {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-danger"><span class="fas fa-user-times"></span></span></td>';
                     }else{
                        RelojMarcador +='<td style="text-align: center;"><span class="text-success"><span class="fas fa-user-check"></span></span></td>';
                     }
                     //validacion de los pases de salida
                     if (data[i].fecPas!='x'){
                        RelojMarcador +='<td style="text-align: center;"><span class="text-tertiary"><span class="fas fa-file" onclick="verdetallesolicitud(\''+data[i].idpas+'\')" style="cursor: pointer;"></span></span></td>';
                     } else {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-light"><span class="fas fa-user-minus"></span></span></td>';
                     }
                     //validacin de vacaciones
                     if (data[i].fecSol!='x'){
                        RelojMarcador +='<td style="text-align: center;"><span class="text-tertiary"><span class="fas fa-plane" onclick="verVacacion(\''+data[i].idvac+'\')" style="cursor: pointer;"></span></span></td>';
                     } else {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-light"><span class="fas fa-user-minus"></span></span></td>';
                     }
                     //validacion de incapacidades
                     if (data[i].fecInc!='x'){
                        RelojMarcador +='<td style="text-align: center;"><span class="text-tertiary"><span class="fas fa-hospital-user" onclick="verIncapacidad(\''+data[i].idinc+'\')" style="cursor: pointer;"></span></span></td>';
                     } else {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-light"><span class="fas fa-user-minus"></span></span></td>';
                     }
                     //validacion de permisos especiales
                     if (data[i].fecPer!='x'){
                        RelojMarcador +='<td style="text-align: center;"><span class="text-tertiary"><span class="fas fa-file-medical-alt" onclick="verPermisoEspecial(\''+data[i].idper+'\')" style="cursor: pointer;"></span></span></td>';
                     } else {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-light"><span class="fas fa-user-minus"></span></span></td>';
                     }
                     //validacion de los feriados
                     if (data[i].fecFer!='x'){
                        RelojMarcador +='<td style="text-align: center;"><span class="text-tertiary"><span class="fas fa-house-user" onclick="verFeriado(\''+data[i].idfer+'\')" style="cursor: pointer;"></span></span></td><tr>';
                     } else {
                        RelojMarcador +='<td style="text-align: center;"><span class="text-light"><span class="fas fa-user-minus"></span></span></td><tr>';
                     }

                     if((diasemanax=='Lunes' || diasemanax=='Martes' || diasemanax=='Miercoles' || diasemanax=='Jueves' || diasemanax=='Viernes')){
                        hpsal=parseFloat(hpsal)+((parseInt(data[i].phing)*parseInt(60)+parseInt(data[i].pming))-(parseInt(data[i].phsal)*parseInt(60)+parseInt(data[i].pmsal)));
                        minutosT=(parseInt(minutosT)+parseInt(data[i].mintar));
                        minutosR=(parseInt(minutosR)+parseInt(data[i].minres));
                     }

                     nferT=parseInt(nferT)+parseInt(data[i].nfer);
                     nvacT=parseInt(nvacT)+parseInt(data[i].nvac);
                     npasT=parseInt(npasT)+parseInt(data[i].npas);
                     nincT=parseInt(nincT)+parseInt(data[i].ninc);
                     perespT=parseInt(perespT)+parseInt(data[i].nper);
                     tdias=parseInt(tdias)+parseInt(data[i].dia);
                  }
               }

               //Otros datos para el reloj
               $('#DatosReloj').html(RelojMarcador);

               if(data.length==0){
                 $("#DatosReloj").html('<tr> <td class="text-danger" colspan="12" style="text-align:center"><i class="far fa-sad-tear" style="margin-right: 5px;"></i>!Lo sentimos¡ No se pudieron encontrar registros.</td></tr>');
               }

              var mins=parseFloat(minutosT)-parseFloat(hpsal);
               minutosT=((parseFloat(minutosT)-parseFloat(hpsal))/parseInt(60))/parseInt(8);
               minutosR=((parseFloat(minutosR)+parseFloat(hpsal))/parseInt(60))/parseInt(8);
              var total=numeral(parseFloat(tdias)+parseFloat(minutosR)+parseFloat(nferT)+parseFloat(finde)+parseFloat(nvacT)).format('0,0.00');
                RelojMarcadort+="<tr><td class='td_totalesA' style='text-align:center;'>"+total+"</td><td class='td_totalesA' style='text-align:center;'>"+numeral(minutosT).format('0,0.00')+"/"+mins+"</td><td class='td_totalesA' style='text-align:center;'>"+sinsal+"</td><td class='td_totalesA' style='text-align:center;'>"+sinent+"</td><td class='td_totalesA' style='text-align:center;'>"+npasT+"/"+hpsal+"</td><td class='td_totalesA' style='text-align:center;'>"+nvacT+"</td><td class='td_totalesA' style='text-align:center;'></td><td class='td_totalesA' style='text-align:center;'></td><td class='td_totalesA' style='text-align:center;'>"+nferT+"</td></tr>";

              //Muestra las tarjetas de dashboards reloj
              $('#relojcards').show();
              //Muestra la tarjeta de dias trabajados
              $('#diast').html(total);
              //Muestra la tarjeta de marcas tardes
              $('#marcarstd').html('<h5 class="h3 font-weight-bold mb-1" id="marcarstd">'+numeral(minutosT).format("0,0.00")+" / "+mins+'</h5>');
              //Muestra la tarjeta de las marcas del reloj (entrada y salida)
              $('#marcarsreloj').html('<h5 class="h3 font-weight-bold mb-1" id="marcarstd">'+sinent+" / "+sinsal+'</h5>');
              //Muestra la tarjeta de pases de salida
              $('#pasesal').html('<h5 class="h3 font-weight-bold mb-1" id="marcarstd">'+npasT+'</h5>');
              //Muestra la tarjeta de vacaciones
              $('#vacas').html('<h5 class="h3 font-weight-bold mb-1" id="marcarstd">'+nvacT+'</h5>');
              //Muestra la tarjeta de las incapacidades y permisos especiales
              $('#incaperes').html('<h5 class="h3 font-weight-bold mb-1" id="marcarstd">'+nincT+" / "+perespT+'</h5>');


              //$('#marcarstd2').html(mins);


           })
        .fail(function( jqXHR, textStatus, errorThrown ) {
            if ( console && console.log ) {
               swal({
                    type: 'error',
                    title: '!Error¡',
                    text: 'Error de conexión intenta nuevamente',
                  })
                  $('#tablehoras').hide();
            }
    });
}

function verdetallesolicitud(id){
   openModal('modal-solicitudes');
   $("#titleS").html("Pase de Salida");
   VercarpetaPases(id);
   DetallePasesalida(id);
}

 function VercarpetaPases(ID){
   var form_data = new FormData();
   form_data.append("action","verArchivospase");
   form_data.append("carpeta",ID);
   $.ajax({
       url: 'api_Empleados.php',
       dataType: 'json',
       cache: false,
       contentType: false,
       processData: false,
       data: form_data,
       type: 'post',
           success: function(dataserver){
             console.log(dataserver);
             var data = dataserver[0];
             var carpase = '';
           if(data.length>0){
               for(var i=0;i<data.length;i++){
             var extencion = data[i].ARCHIVO.substring(0,data[i].ARCHIVO.length-4);

                  carpase += '<a class="text-info mr-3" target="_blank" href="PasedeSalida/'+ID+'/'+data[i].ARCHIVO+'"><i class="far fa-file-pdf" style="margin-right: 10px;margin-left: 5px;"></i>'+data[i].ARCHIVO+'</a>';
                  }
           }

             $('#archivossolicitudes').html(carpase);

          }
       });

 }

function DetallePasesalida(id){
  var form_data = new FormData();
  form_data.append("action","ReportePasedeSalidas");
  form_data.append("Codigo",id);
  $.ajax({
    url: 'api_Empleados.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function(dataserver){
      console.log(dataserver);
      var data = dataserver[0];
      var Detalle = '';
      if(data.length>0){
        var Detalle = '';
         Detalle += '<tr> <th>Código Pase</th><td style="font-weight:bold;">'+data[0].ID_Pase_Salida+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Datos Pase de Salida </th></tr> <tr><th>Solicitante</th><td>'+data[0].Nombres+' '+data[0].Apellidos+' </td></tr>  <tr><th>Departamento</th><td>'+data[0].DESC_Area+'</td></tr>  <tr><th>Fecha creación</th><td>'+data[0].Sistema_Fecha+'</td></tr> <tr><th>Hora creación</th><td>'+data[0].Hora_Creacion+'</td></tr> <tr><th>Fecha solicitud</th><td>'+data[0].Fecha_Solicitud+'</td></tr> <tr><th>Hora de salida</th><td>'+data[0].Hora_Salida+'</td></tr> <tr><th>Hora de regereso</th><td>'+data[0].Hora_Entrada+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Estado Pase de Salida</th></tr> <tr><th>Fecha aprobación jefe</th><td>'+data[0].Fecha_Jefe+'</td></tr> <tr><th>Hora aprobación jefe</th><td>'+data[0].Hora_Aceptacion_Jefe+'</td></tr> <tr><th>Aprueba jefe</th><td>'+data[0].Sistema_Jefe+'</td></tr>  <tr><th>Observación jefe</th><td>'+data[0].Ob_Area+'</td></tr>   <tr><th>Aprueba rrhh</th><td>'+data[0].Sistema_RRHH+'</td></tr> <tr><th>Fecha aprobación rrhh</th><td>'+data[0].Fecha_RRHH+'</td></tr> <tr><th>Hora aprobación rrhh</th><td>'+data[0].Hora_Aceptacion_RRHH+'</td></tr> <tr><th>Observacion rrhh</th><td>'+data[0].Ob_RRHH+'</td></tr> <tr><th>Etapa solicitud</th><td>'+data[0].ID_Estado_Pase+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Detalle Pase de Salida</th></tr> <tr><th>Observacion empleado</th><td>'+data[0].DESC_Pase_Salida+'</td></tr> <tr><th style=" width: 172px; ">Opciones</th><td><a onclick="imprimirpase(\''+id+'\');" id="aceptarsol" class="text-tertiary mr-3" style="color: white;"> <i class="fas fa-print" style="cursor: pointer;float: left;line-height: 21px;margin-right: 5px;"></i>Imprimir pase</a> </td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Documentos Cargados</th></tr>';
         $('#detallesolicitud').html(Detalle);
         $('#imprimirs').html('<a target="_blank" href="https://satt.transporte.gob.hn:83/ReportePasedeSalida.php?Solicitud='+id+'" class=" modal-action modal-close waves-effect waves-green btn-flat btn_cerrarModal">Imprimir</a>');

      }
    }
  });
}
function imprimirpase(id) {
  window.open('https://satt.transporte.gob.hn:83/ReportePasedeSalida.php?Solicitud='+id, '_blank');
}

function verVacacion(id){
  verdetallevacaciones(id);
}

function verdetallevacaciones(id){
  openModal('modal-solicitudes');
  $("#titleS").html("Detalle de Vacación");
  VercarpetaVacas(id);
   var form_data = new FormData();
   form_data.append("action","DetalleVacaciones");
   form_data.append("Codigo",id);
   $.ajax({
      url: 'api_Empleados.php',
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function(dataserver){
      var data = dataserver[0];
      var pases = '';

      if(data[0].CodigoEmpleadoRRHH==null && data[0].CodigoEtapa =='DENEGADO') { 
        var Etapa = 'JEFE';
      } else if(data[0].CodigoEmpleadoJefe!=null && data[0].CodigoEtapa =='PENDIENTE') { 
        var Etapa = 'RRHH'; 
      } else { 
        var Etapa = 'RRHH';
      }

        if(data.length>0){
          var pases = '<tr> <th>Código</th> <td style="font-weight:bold;">'+data[0].CodigoVacaciones+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Datos Solicitud Vacación </th></tr> <tr><th>Empleado</th><td>'+data[0].Nombres+'  '+data[0].Apellidos+' </td></tr> <tr><th>Fecha solicitud</th> <td>'+data[0].FechaSolicitud+'</td></tr> <tr> <th>Hora solicitud</th> <td>'+data[0].Hora_Solicitud+'</td></tr> <tr> <th>Observación</th> <td>'+data[0].ObservacionesEmpleado+' </td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Estado Solicitud Vacación</th></tr> <tr><th>Etapa</th><td> '+Etapa+'  '+data[0].CodigoEtapa+'</td></tr> <tr> <th>Sistema jefe</th> <td>'+data[0].CodigoEmpleadoJefe+'</td></tr> <tr> <th>Fecha jefe</th> <td>'+data[0].FechaJefe+'</td></tr> <th>Hora aceptación jefe</th> <td>'+data[0].Hora_Aceptacion_Jefe+'</td></tr> <tr> <th>Observación jefe</th> <td>'+data[0].ObservacionesJefe+' </td></tr> <tr> <th>Sistema rrhh</th> <td>'+data[0].CodigoEmpleadoRRHH+' </td></tr> <tr> <th>Fecha rrhh</th> <td>'+data[0].FechaRRHH+'</td></tr> <th>Hora aceptación rrhh</th> <td>'+data[0].Hora_Aceptacion_RRHH+'</td></tr> <tr> <th>Observación rrhh</th> <td>'+data[0].ObservacionesRRHH+' </td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;"> Fechas Solicitadas </th></tr> ';
          var Con = 1;
           var totdia=0;
          for(var i=0;i<data.length;i++){
            var con = Con++;
            pases += '<tr><td>'+data[i].FechaSolicita+' </td><th>'+data[i].Dia_Proporcion+' -- Dia</th></tr>';
            totdia=parseFloat(totdia)+parseFloat(data[i].Dia_Proporcion);
          }
          pases += '<tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;"> Total dias Solicitados: '+totdia+' </th></tr>';
        }else{
          var pases = '<tr> <td colspan="2" style="text-align: center;">Sin Solicitudes Pendientes</td></tr>';
        }
        pases +='<tr><th style=" width: 172px; ">Opciones</th><td><a onclick="imprimirvaca(\''+id+'\');" id="aceptarsol" class="text-tertiary mr-3" style="color: white;"> <i class="fas fa-print" style="cursor: pointer;float: left;line-height: 21px;margin-right: 5px;"></i>Imprimir vacación </a> </td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Documentos Cargados</th></tr>';
        $('#vacacionesx').val(data[0].CodigoVacaciones);
        $('#detallesolicitud').html(pases);

      }
   });

}
//Recupera el archivo pdf de las vacaciones
function imprimirvaca(id) {
  window.open('https://satt.transporte.gob.hn:83/api_rep.php?action=printvaca&va='+id, '_blank');
}
//Funcion para ver los datos de las vacaciones
function VercarpetaVacas(ID){
  var form_data = new FormData();
  form_data.append("action","verArchivosV2");
  form_data.append("carpeta",ID);
  $.ajax({
      url: 'api_Empleados.php',
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function(dataserver){
        console.log(dataserver);
        var data = dataserver[0];
        var carpvacas = '';
        if(data.length>0){
          for(var i=0;i<data.length;i++){
            var extencion = data[i].ARCHIVO.substring(0,data[i].ARCHIVO.length-4);
              carpvacas += '<a class="class="text-info mr-3" target="_blank" href="vacaciones/'+ID+'/'+data[i].ARCHIVO+'"><i class="far fa-file-pdf" style="margin-right: 10px;margin-left: 5px;"></i>'+data[i].ARCHIVO+'</a>';
          }
        }

        $('#archivossolicitudes').html(carpvacas);

     }
  });

}
//Funcion para recuperar los datos de la incapacidades
function verIncapacidad(id){
  var iduser= $("#idemple").val();
  verdetalleincapacidad(id);
  CarpetaIncapadidad(iduser);
}
//Recupera el detalle de la incapacidad para el modal
function verdetalleincapacidad(id){
  openModal('modal-solicitudes');
  $("#titleS").html("Detalle de Incapacidad");
  //CarpetaIncapadidad();
   var form_data = new FormData();
   form_data.append("action","DetalleIncapacidades");
   form_data.append("codigo",id);
   $.ajax({
      url: 'api_Empleados.php',
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function(dataserver){
      var data = dataserver[0];
      var inca = '';
      var est='';
      var eta='';
      var compara='';

      if(data.length>0){
        compara=data[0].ID_Etapa;
      if(compara.trim()=='RRHH'){ 
        eta=data[0].ID_Etapa;
        est=data[0].Estado_RRHH;
      } else {
        eta=data[0].ID_Etapa;
        est=data[0].Estado_Jefe;
      }

      var pases = '<tr> <th>Codigo </th> <td style="font-weight:bold;">'+data[0].ID_Incapacidad+'</td><tr> <th>Total dias</th> <td>'+data[0].dia+' dias</td></tr></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Datos Incapacidad </th></tr><tr> <th>Fecha registro</th>  <td>'+data[0].fsi+' </td></tr><tr> <th>Hospital/Clinica</th>  <td>'+data[0].hos+' </td></tr><tr> <th>Detalle hospital</th>  <td>'+data[0].hod+' </td></tr><tr> <th>Tipo enfermedad</th> <td>'+data[0].enf+'</td></tr><th>Detalle enfermedad</th> <td>'+data[0].dei+'</td></tr> <tr> <th>Nombre empleado </th> <td>'+data[0].Empleado_Nombre+'</td></tr><tr> <th>Fecha solicitud</th> <td>'+data[0].Fecha_Incapacidad+'</td></tr> <th>Hora solicitud</th> <td>'+data[0].Hora_Solicitud+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Estado de incapacidad</th></tr></tr> <tr> <th>Etapa</th><td class="td_totalesA"> '+eta+' *** '+est+' </td></tr><tr> <th>Nombre jefe</th><td>'+data[0].Jefe_Encargado_Nombre+'</td></tr> <tr> <th>Aprobación jefe </th> <td>'+data[0].Fecha_Jefe+'</td></tr><tr> <th>Hora aceptación jefe</th> <td>'+data[0].Hora_Aceptacion_Jefe+'</td></tr> <th>Observación jefe </th>  <td>'+data[0].ObservacionJefe+' </td></tr> <tr> <th>Nombre rrhh</th> <td>'+data[0].RRHH_Encargado_Nombre+' </td></tr> <tr> <th>Fecha rrhh</th> <td>'+data[0].Fecha_RRHH+'</td></tr> <th>Hora aceptación rrhh</th> <td>'+data[0].Hora_Aceptacion_RRHH+'</td></tr> <tr> <th>Observación rrhh</th>  <td>'+data[0].ObservacionRRHH+' </td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;"> Fechas Solicitadas</th></tr> ';
      var Con = 1;
      for(var i=0;i<data.length;i++){
        var con = Con++;
        pases += '<tr><th>Fecha '+con+'</th>  <td>'+data[i].Fecha_Dia+' </td></tr>';
      }
               
      }else{
        var pases = '<tr> <td colspan="6" style="text-align: center;" >Sin Solicitudes Pendientes</td></tr>';
      }
        pases +='<tr><th style=" width: 172px; ">Opciones</th><td><a onclick="imprimirinca(\''+id+'\');" id="aceptarsol" class="text-tertiary mr-3" style="color: white;"> <i class="fas fa-print" style="cursor: pointer;float: left;line-height: 21px;margin-right: 5px;"></i>Imprimir incapacidad</a> </td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Documentos Cargados</th></tr>';

      $('#imprimirsI').html('<a target="_blank" href="https://satt.transporte.gob.hn:83/ReporteIncapacidad.php?Solicitud='+id+'" class=" modal-action modal-close waves-effect waves-green btn-flat btn_cerrarModal">Imprimir</a>');
      $('#detallesolicitud').html(pases);
      }
   });

}
//Recupera el archivo pdf de la inapacidad
function imprimirinca(id) {
  window.open('https://satt.transporte.gob.hn:83/ReporteIncapacidad.php?Solicitud='+id, '_blank');
}
//Ver la carperta de incapacidades
function CarpetaIncapadidad(user){
  var form_data = new FormData();
  form_data.append("action","verArchivosI");
  form_data.append("usu",user);
  $.ajax({
      url: 'https://satt.transporte.gob.hn:83/api_Empleados.php',
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,                         
      type: 'post',
      success: function(dataserver){
        console.log(dataserver);
        var data = dataserver[0];
        var Incapacidad = '';
          if(data.length>0){
              for(var i=0;i<data.length;i++){
                var extencion = data[i].ARCHIVO.substring(0,data[i].ARCHIVO.length-4);

                Incapacidad += '<a class="class="text-info mr-3" target="_blank" href="https://satt.transporte.gob.hn:83/Incapacidades/Empleado-'+user+'/'+data[i].ARCHIVO+'"><i class="far fa-file-pdf" style="margin-right: 10px;margin-left: 5px;"></i>'+data[i].ARCHIVO+'</a>';
              }
          }

          $('#archivossolicitudes').html(Incapacidad);

         }
      });
}

//Funcion para recuperar los datos y archivos de los permisos especiales
function verPermisoEspecial(id){
  var iduser= $("#idemple").val();
  verdetallepermisoespecial(id);
  CarpetaPermisoEspecial(id,iduser);
}

//Recupera el detalle del permiso especial para el modal
function verdetallepermisoespecial(id){
  openModal('modal-solicitudes');
  $("#titleS").html("Detalle de Permiso Especial");
  //CarpetaIncapadidad();
   var form_data = new FormData();
   form_data.append("action","DetallePermisosEspeciales");
   form_data.append("codigo",id);
   $.ajax({
      url: 'api_Empleados.php',
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: 'post',
      success: function(dataserver){
      var data = dataserver[0];
      var pases = '';
      var est='';
      var eta='';
      var compara='';

      if(data.length>0){
        compara=data[0].ID_Etapa;
        if(compara.trim()=='RRHH'){ 
          eta=data[0].ID_Etapa;
          est=data[0].Estado_RRHH;
        } else {
          eta=data[0].ID_Etapa;
          est=data[0].Estado_Jefe;
      }

      var pases = '<tr> <th>Codigo </th> <td style="font-weight:bold;">'+data[0].ID_PermisoEspecial+'</td><tr> <th>Total dias</th> <td>'+data[0].per+' dias</td></tr></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Datos Incapacidad </th></tr><tr> <th>Fecha solicitud</th>  <td>'+data[0].Fecha_PermisoEspecial+' </td></tr><tr> <th>Hora solicitud</th>  <td>'+data[0].Hora_PermisoEspecial+' </td></tr><tr> <th>Tipo permiso</th>  <td>'+data[0].Clase_Permiso+' </td></tr><tr> <th>Condiciones permiso</th> <td>'+data[0].Desc_Tiempo_Permiso+'</td></tr><th>Descripción</th> <td>'+data[0].Descripcion_Permiso+'</td></tr> <tr> <th>Nombre empleado </th> <td>'+data[0].Empleado_Nombre+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Estado de incapacidad</th></tr></tr> <tr> <th>Etapa</th><td class="td_totalesA"> '+eta+' *** '+est+' </td></tr><tr> <th>Nombre jefe</th><td>'+data[0].Jefe_Encargado_Nombre+'</td></tr> <tr> <th>Aprobación jefe </th> <td>'+data[0].Fecha_Jefe+'</td></tr><tr> <th>Hora aceptación jefe</th> <td>'+data[0].Hora_Aceptacion_Jefe+'</td></tr> <th>Observación jefe </th>  <td>'+data[0].ObservacionJefe+' </td></tr> <tr> <th>Nombre rrhh</th> <td>'+data[0].RRHH_Encargado_Nombre+' </td></tr> <tr> <th>Fecha rrhh</th> <td>'+data[0].Fecha_RRHH+'</td></tr> <th>Hora aceptación rrhh</th> <td>'+data[0].Hora_Aceptacion_RRHH+'</td></tr> <tr> <th>Observación rrhh</th>  <td>'+data[0].ObservacionRRHH+' </td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;"> Fechas Solicitadas</th></tr> ';
      var Con = 1;
      for(var i=0;i<data.length;i++){
        var con = Con++;
        pases += '<tr><th>Fecha '+con+'</th>  <td>'+data[i].Fecha_Dia+' </td></tr>';
      }
               
      }else{
        var pases = '<tr> <td colspan="6" style="text-align: center;" >Sin Solicitudes Pendientes</td></tr>';
      }
        pases +='<tr><th style=" width: 172px; ">Opciones</th><td><a onclick="imprimirperesp(\''+id+'\');" id="aceptarsol" class="text-tertiary mr-3" style="color: white;"> <i class="fas fa-print" style="cursor: pointer;float: left;line-height: 21px;margin-right: 5px;"></i>Imprimir permiso</a> </td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Documentos Cargados</th></tr>';

      $('#detallesolicitud').html(pases);
      }
   });

}

//Recupera el archivo pdf del permiso especial
function imprimirperesp(id) {
  window.open('https://satt.transporte.gob.hn:83/ReportePE.php?Solicitud='+id, '_blank');
}

//Ver la carperta de los permisos especiales
function CarpetaPermisoEspecial(id,iduser){
  var form_data = new FormData();
  form_data.append("action","verArchivosPE");
  form_data.append("carpeta",id);
  form_data.append("usu",iduser);
  $.ajax({
      url: 'https://satt.transporte.gob.hn:83/api_Empleados.php',
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,                         
      type: 'post',
      success: function(dataserver){
        console.log(dataserver);
        var data = dataserver[0];
        var PermisosEsp = '';
          if(data.length>0){
              for(var i=0;i<data.length;i++){
                var extencion = data[i].ARCHIVO.substring(0,data[i].ARCHIVO.length-4);
                PermisosEsp += '<a class="class="text-info mr-3" target="_blank" href="https://satt.transporte.gob.hn:83/Permisos/Empleado-'+iduser+'/'+data[i].ARCHIVO+'"><i class="far fa-file-pdf" style="margin-right: 10px;margin-left: 5px;"></i>'+data[i].ARCHIVO+'</a>';
              }
          }

        $('#archivossolicitudes').html(PermisosEsp);

      }
  });

}
//Obtener el detalle de las constancia
function DetalleConstacia(id){
  openModal('modal-solicitudes');
  $("#titleS").html("Detalle de Constancia");

  var form_data = new FormData();
  form_data.append("action","Reporteconstancia");
  form_data.append("Codigo",id);
  $.ajax({
    url: 'api_Empleados.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function(dataserver){
      console.log(dataserver);
      var data = dataserver[0];
      var Detalle = '';
      if(data.length>0){
        var Detalle = '';
         Detalle += '<tr> <th>Código Constancia</th><td style="font-weight:bold;">'+data[0].ID_Constancia+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Datos Constancia</th></tr> <tr><th>Solicitante</th><td>'+data[0].Nombres+' '+data[0].Apellidos+' </td></tr> <tr><th>Fecha solicitud</th><td>'+data[0].Sistema_Fecha+'</td></tr> <tr><th>Hora solicitud</th><td>'+data[0].Hora_Solicitud+'</td></tr> <tr><th>Tipo constancia</th><td>'+data[0].DESC_Tipo+'</td></tr> <tr><th>Motivo de solicitud</th><td>'+data[0].Observacion+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Estado Constancia</th></tr> <tr><th>Fecha entrega</th><td>'+data[0].Fecha_Entrega+'</td></tr> <tr><th>Aprueba encargado</th><td>'+data[0].Sistema_RRHH+'</td></tr>  <tr><th>Observación encargado</th><td>'+data[0].Observacion_RRHH+'</td></tr>  <tr><th>Etapa solicitud</th><td>'+data[0].ID_Estado+'</td></tr>';
         $('#detallesolicitud').html(Detalle);
      }
    }
  });
}

//Funcion para restar las horas y sacar el total solicitado
function restarHoras() {
  if ($('#horasalida').val()=='') {
      return;
  }


  inicio = horamilitar(document.getElementById("horasalida").value);
  fin = horamilitar(document.getElementById("horaentrada").value);

  inicioMinutos = parseInt(inicio.substr(3,2));
  inicioHoras = parseInt(inicio.substr(0,2));

  finMinutos = parseInt(fin.substr(3,2));
  finHoras = parseInt(fin.substr(0,2));

  transcurridoMinutos = finMinutos - inicioMinutos;
  transcurridoHoras = finHoras - inicioHoras;

  if (transcurridoMinutos < 0) {
    transcurridoHoras--;
    transcurridoMinutos = 60 + transcurridoMinutos;
  }

  horas = transcurridoHoras.toString();
  minutos = transcurridoMinutos.toString();

  if (horas.length < 2) {
    horas = "0"+horas;
  }

  if (horas.length < 2) {
    horas = "0"+horas;
  }

  $('#resta').html(horas+" Horas "+minutos+" Minutos ");
}

//Conversion de hora
function horamilitar(hora){
  var Jornada = hora.substr(6);
   if (Jornada=='PM') {
      var horan = hora.substring(0,hora.length-6);
      if (horan=='01') { var h = '13'; }else if(horan=='02'){var h = '14';}else if(horan=='03'){var h = '15';}else if(horan=='04'){var h = '16';} else if(horan=='05'){var h = '17';}else if(horan=='06'){var h = '18';}else if(horan=='07'){var h = '19';}else if(horan=='08'){var h = '20';}else if(horan=='9'){var h = '21';}else if(horan=='10'){var h = '22';}else if(horan=='11'){var h = '23';}else if(horan=='14'){var h = '00';}else if(horan=='12'){var h = '12';}
     var horam = h+hora.substring(2,5);
   } else {
      var horam = hora.substring(0,hora.length-2);
   }
   return horam;
}

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

    var form_data = new FormData();
    form_data.append("action","save-escaneo");
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
          url: 'api_Empleados.php',
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
            } else {
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
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@ FUNCION PARA RECUPERAR EL ACHIVO ADJUNTO    @@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function ArchivosSolicitud(){
    var form_data = new FormData();
    form_data.append("action","ArchivosSolicitud");
    form_data.append("documentoFTT",$('#ArchivoTemporal').val());

    $.ajax({
    url: 'api_Empleados.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
        success: function(dataserver){
          console.log(dataserver);
          var data = dataserver[0];
          var Denuncia = '';
        if(data.length>0){
           var n = 0;
            for(var i=0;i<data.length;i++){
              n = n+1
               Denuncia += '<tr> <th scope="row">'+n+'</th> <td style="text-align:center;"><a target="_blank" href="PasedeSalida/'+$('#ArchivoTemporal').val()+'/'+data[i].ARCHIVO+'" style="color: #3b6279;" >'+data[i].ARCHIVO+'</a></td> <td style="text-align:center;"><i id="borrardoc" onclick="confirmarEliminarArchivos(\''+data[i].ARCHIVO+'\')" class="fas fa-trash text-danger mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete item"></i></td> </tr>';
              // Denuncia += '<li class="collection-item" style=" text-align: left; border-radius: 50px !important; color: #3b6279;"><a target="_blank" href="Documentos/'+$('#ArchivoTemporal').val()+'/'+data[i].ARCHIVO+'" style="color: #3b6279;"></a> <div style=" float: left;"> <a target="_blank" href="Documentos/'+$('#ArchivoTemporal').val()+'/'+data[i].ARCHIVO+'" style="color: #3b6279;" >'+data[i].ARCHIVO+'</a></div> <div style=" text-align: right;"> <a onclick="confirmarEliminarArchivos(\''+data[i].ARCHIVO+'\')" style=" cursor: pointer; "><i class="material-icons" style="color: rgba(255, 0, 0, 0.52);">delete</i></a> </div></li>';

            }
        }else{
          $("#grabap2").css("display","none");
          $("#archivos").css("display","none");
          Denuncia +='';
        }

        $('#ArchivosSolicitudtable').html(Denuncia);

       }
    });
}

//Funciones para la carga de solicitudes de jefes
function DetallePasesalida_Jefe(id,key,user){
  openModal('modal-solicitudes');
  $("#titleS").html("Pase de Salida");
  var form_data = new FormData();
  form_data.append("action","ReportePasedeSalidas");
  form_data.append("Codigo",id);
  $.ajax({
    url: 'api_Empleados.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: form_data,
    type: 'post',
    success: function(dataserver){
      console.log(dataserver);
      var data = dataserver[0];
      var Detalle = '';
      if(data.length>0){
        var Detalle = '';
         Detalle += '<tr> <th>Código Pase</th><td style="font-weight:bold;">'+data[0].ID_Pase_Salida+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Datos Pase de Salida </th></tr> <tr><th>Solicitante</th><td>'+data[0].Nombres+' '+data[0].Apellidos+' </td></tr>  <tr><th>Departamento</th><td>'+data[0].DESC_Area+'</td></tr>  <tr><th>Fecha creación</th><td>'+data[0].Sistema_Fecha+'</td></tr> <tr><th>Hora creación</th><td>'+data[0].Hora_Creacion+'</td></tr> <tr><th>Fecha solicitud</th><td>'+data[0].Fecha_Solicitud+'</td></tr> <tr><th>Hora de salida</th><td>'+data[0].Hora_Salida+'</td></tr> <tr><th>Hora de regereso</th><td>'+data[0].Hora_Entrada+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Estado Pase de Salida</th></tr> <tr><th>Fecha aprobación jefe</th><td>'+data[0].Fecha_Jefe+'</td></tr> <tr><th>Hora aprobación jefe</th><td>'+data[0].Hora_Aceptacion_Jefe+'</td></tr> <tr><th>Aprueba jefe</th><td>'+data[0].Sistema_Jefe+'</td></tr>  <tr><th>Observación jefe</th><td>'+data[0].Ob_Area+'</td></tr>   <tr><th>Aprueba rrhh</th><td>'+data[0].Sistema_RRHH+'</td></tr> <tr><th>Fecha aprobación rrhh</th><td>'+data[0].Fecha_RRHH+'</td></tr> <tr><th>Hora aprobación rrhh</th><td>'+data[0].Hora_Aceptacion_RRHH+'</td></tr> <tr><th>Observacion rrhh</th><td>'+data[0].Ob_RRHH+'</td></tr> <tr><th>Etapa solicitud</th><td>'+data[0].ID_Estado_Pase+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Detalle Pase de Salida</th></tr> <tr><th>Observacion empleado</th><td>'+data[0].DESC_Pase_Salida+'</td></tr> <tr><th colspan="2" style=" text-align: center; background: #dedddd;color:white;">Opciones</th></tr> <tr><td style="text-align: center;"><a onclick="aprovarsolicitud(\''+key+'\',\''+user+'\',1)" id="aceptarsol" class="btn btn-success" role="button" style="color: white;border-radius: 10px;"> <i class="far fa-grin-wink" style="cursor: pointer;float: left;line-height: 21px;margin-right: 5px;font-size: 25px;"></a></td> <td style="text-align: center;"> <a onclick="aprovarsolicitud(\''+key+'\',\''+user+'\',2)" class="btn btn-danger" role="button" style="color: white;"> <i class="far fa-dizzy" style="cursor: pointer;float: left;line-height: 21px;margin-right: 5px;font-size: 25px;"></i></a></td></tr>';
         $('#detallesolicitud').html(Detalle);
      }
    }
  });
}

function aprovarsolicitud(key,user,t){
  if(t==1) { 
    var tipo = 'aceptar'; 
  }else { 
    var tipo = 'delete';
  }
  window.open("https://satt.transporte.gob.hn:201/Validate_Solicitudes.php?key="+key+"&es="+tipo+"&hy="+user+" ");
  window.location.reload(true);
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
    url: 'api_Empleados.php',
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

//Funcion para confirmar guardar pase de salida
function confirmarGuardar_PaseSalida(){
  //Datos del solicitante
  if($("#nombreempleado").val().trim().length<1){
    toastwarning("El campo del nombre del solicitante esta vacío.");
    return;
  }
  if($("#tiposalida").val()==null){
     toastwarning("Debe seleccionar el tipo de salida.");
    return;
  }
  if($("#fechadesalida").val().trim().length<1){
    toastwarning("La fecha de salida esta vacío.");
    return;
  }
  if($("#horasalida").val().trim().length<1){
    toastwarning("La hora de salida esta vacío.");
    return;
  }
  if($("#horaentrada").val().trim().length<1){
    toastwarning("La hora de entrada esta vacío.");
    return;
  }
  if($("#motivo").val().trim().length<1){
    toastwarning("Motivo de su salida obligatorio.");
    return;
  }
  
  swal({
      title: "¿Esta Seguro de Guardar los Cambios?",
      text: "Se generara el pase de salida por: <span style='color:#893168;'><b>"+$('#resta').html()+"</b></span>",
      type: "warning",
      html:true,
      showCancelButton: true,
      cancelButtonText: "!No¡ cancelar",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "!Si¡ guardar",
      closeOnConfirm: false
    },
    function(){
      savePaseSalida();
    });
   $("#contenthome").removeClass("m");
   $("#contenthome").addClass("a");
}

//Funcion de insert pasesalida
function savePaseSalida() {

  var alert = $("#emailempleado").html();

  if (alert=='') {
    swal({
        title: "<div style='color:#636262'>!Error al guardar¡</div>",
        text: "<div style='color:#636262'>Debe contactarse con RRHH ya que no cuenta con correo institucional.</div>",
        type: "error",
        html: true,
        confirmButtonText: "Aceptar",
      });
    return;
  }

  var form_data = new FormData();
    form_data.append("action","SavePasedeSalida");
    //Datos del pase de salida
    form_data.append("motivo", $("#motivo").val());
    form_data.append("tiposalida", $("#tiposalida").val());
    form_data.append("fechadesalida", $("#fechadesalida").val());
    form_data.append("horasalida", $("#horasalida").val());
    form_data.append("horaentrada", $("#horaentrada").val());
    form_data.append("idemple", $("#idemple").val());
    form_data.append("passol", $("#nombreempleado").val());
    form_data.append("fotoperfil", $("#fotoperfil").val());
    form_data.append("Cargo", $("#cargoempl").val());
    form_data.append("hy",$('#nomtitulara').val());
  
    fetch("api_Empleados.php",
    {
      method: "POST",
      body: form_data
    })
      .then((resp) => resp.json())
      .then(Data=>{
        if (Data.status==1) {
          swal({
            title: "¡Se ha guardado su pase de salida satisfactoriamente! ",
            type: "success",
            confirmButtonText: "Continuar"
          },function(){
            actualizar_datospase();
          });
          $("#contenthome").removeClass("a");
          $("#contenthome").addClass("m");
        }else if(Data.status==3){
            swal({
                title: "<div style='color:#636262'>!Error al guardar¡</div>",
                text: "<div style='color:#636262'>Usted tiene un pase de salida pendiente.</div>",
                type: "error",
                html: true,
                confirmButtonText: "Aceptar",
            });
            $("#contenthome").removeClass("m");
            $("#contenthome").addClass("a");
        } else {
          sweetAlert("!ATENCIÓN¡",Data.status, "error");
        }
      })
    .catch(err=>{ console.log(err); });
}

function actualizar_datospase(){
  $("#tiposalida").val('-1').trigger('change');
  $("#fechadesalida").val("");
  $("#horasalida").val("");
  $("#horaentrada").val("");
  $("#motivo").val("");
}

//Funcion para confirmar guardar solicitud de constancia
function confirmarGuardar_Constancia(){
  //Datos de la constancia
  if($("#tipoconstancia").val()==null){
     toastwarning("Debe seleccionar el tipo de constancia.");
    return;
  }
  if($("#dirigidaa").val().trim().length<1){
    toastwarning("Debe especificar a quien va dirigida la constancia.");
    return;
  }
  if($("#motivocons").val().trim().length<1){
    toastwarning("Motivo de su solicitud de constancia obligatorio.");
    return;
  }
  
  swal({
      title: "¿Esta Seguro de Guardar los Cambios?",
      text: "¡Una vez generada la solicitud no podrá deshacer los cambios!",
      type: "warning",
      html:true,
      showCancelButton: true,
      cancelButtonText: "!No¡ cancelar",
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "!Si¡ guardar",
      closeOnConfirm: false
    },
    function(){
      saveConstancia();
    });
   $("#contenthome").removeClass("m");
   $("#contenthome").addClass("a");
}

//Funcion de insert pasesalida
function saveConstancia() {

  var form_data = new FormData();
    form_data.append("action","saveConstancia");
    //Datos del pase de salida
    form_data.append("tipoconstancia", $("#tipoconstancia").val());
    form_data.append("nomtipocons", $("#nomtipocons").val());
    form_data.append("dirigidaa", $("#dirigidaa").val());
    form_data.append("motivocons", $("#motivocons").val());
    form_data.append("idemple", $("#idemple").val());
    form_data.append("nombreempleado", $("#nombreempleado").val());
    form_data.append("fotoperfil", $("#fotoperfil").val());
    form_data.append("Cargo", $("#cargoempl").val());
  
    fetch("api_Empleados.php",
    {
      method: "POST",
      body: form_data
    })
      .then((resp) => resp.json())
      .then(Data=>{
        if (Data.status==1) {
          swal({
            title: "¡Solicitud enviada satisfactoriamente! ",
            text: "<b>Nota:</b> La solicitud estará en la interfaz de constancias pendientes hasta ser contestada por recursos humanos.",
            type: "success",
            html:true,
            confirmButtonText: "Continuar"
          },function(){
            actualizar_datoscons();
          });
          $("#contenthome").removeClass("a");
          $("#contenthome").addClass("m");
        }else if(Data.status==3){
            swal({
                title: "<div style='color:#636262'>!Error al guardar¡</div>",
                text: "<div style='color:#636262'>Usted tiene una solicitud de constancia pendiente.</div>",
                type: "error",
                html: true,
                confirmButtonText: "Aceptar",
            });
            $("#contenthome").removeClass("m");
            $("#contenthome").addClass("a");
        } else {
          sweetAlert("!ATENCIÓN¡",Data.status, "error");
        }
      })
    .catch(err=>{ console.log(err); });
}

function actualizar_datoscons(){
  $("#tipoconstancia").val('-1').trigger('change');
  $("#nomtipocons").val("");
  $("#dirigidaa").val("");
  $("#motivocons").val("");
}

function actualizar(){
  window.location.reload(true);
}
